import React, { useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter, Link, NavLink, Route, Routes, useParams, useLocation } from 'react-router-dom'
import { policies } from './policies'
import './styles.css'

const PLAY = 'https://play.google.com/store/apps/details?id='

const apps = [
  {
    id:'arrow-puzzle', name:'Arrow Puzzle Escape', type:'Game', tag:'Logic puzzle',
    pkg:'com.arrowspuzzle.escape', mark:'↗', color:'#ff9f0a', accent:'gold',
    icon:'/icons/arrow-puzzle.png',
    shots:['/shots/arrow-puzzle-1.jpg','/shots/arrow-puzzle-2.jpg','/shots/arrow-puzzle-3.jpg','/shots/arrow-puzzle-4.jpg'],
    description:'Fifty hand-crafted levels built around a single mechanic: clear directional arrows in exactly the right order to find your way out.',
    features:['50 handcrafted levels','Pure logic, no timers','Plays fully offline'],
    policyUrl:'https://kaushalbahl007.github.io/Privacy-policy-arrow-puzzle/',
  },
  {
    id:'flowpath', name:'Flow Path: Pipe Puzzle Game', type:'Game', tag:'Pipe puzzle',
    pkg:'com.flowpath.game', mark:'✦', color:'#7a9a86', accent:'green',
    icon:'/icons/flowpath.png',
    shots:['/shots/flowpath-1.png','/shots/flowpath-2.jpg','/shots/flowpath-3.jpg','/shots/flowpath-4.jpg'],
    description:'Connect matching colour dots with flowing pipes until every cell on the board fills — a calmer, more meditative take on the classic pipe genre.',
    features:['Relaxed, meditative pacing','Progress stored locally','Plays fully offline'],
    policyUrl:'https://kaushalbahl007.github.io/PATHFLOW-privacy-policy/',
  },
  {
    id:'ludo', name:'Ludo Indian Adition', type:'Game', tag:'Board game',
    pkg:'com.ludoindianedition', mark:'◉', color:'#c97260', accent:'red',
    icon:'/icons/ludo.png',
    shots:['/shots/ludo-1.png','/shots/ludo-2.png','/shots/ludo-3.png','/shots/ludo-4.png'],
    description:'A modern, vibrant take on the beloved Indian classic, built for smooth local multiplayer between two and four players on one device.',
    features:['Local multiplayer for 2–4 players','Classic rules, modern feel','Quick rounds'],
    policyUrl:'https://kaushalbahl007.github.io/privacy-policy/',
  },
  {
    id:'block-burst', name:'Block Burst: Wood Puzzle', type:'Game', tag:'Block puzzle',
    pkg:'com.benzenestudio.block_burst', mark:'▦', color:'#8d95a8', accent:'blue',
    icon:'/icons/block-burst.png',
    shots:['/shots/block-burst-1.png','/shots/block-burst-2.jpg','/shots/block-burst-3.jpg','/shots/block-burst-4.jpg'],
    description:'Place wooden blocks on an 8×8 grid and clear full rows and columns before the board fills up — calm on the surface, sharper the longer you play.',
    features:['Endless 8×8 gameplay','Optional one-time ad removal','Progress stored on device'],
    policyUrl:'https://kaushalbahl007.github.io/block_burst_privacy_policy/',
  },
  {
    id:'marble-ball-sort', name:'Marble Ball Sort: Tube Puzzle', type:'Game', tag:'Colour sorting',
    pkg:'com.tubesort.puzzle', mark:'●', color:'#cf9f57', accent:'gold',
    icon:'/icons/marble-ball-sort.png',
    shots:['/shots/marble-ball-sort-1.jpg','/shots/marble-ball-sort-2.jpg','/shots/marble-ball-sort-3.jpg','/shots/marble-ball-sort-4.jpg'],
    description:'Sort coloured marbles into matching tubes, one careful move at a time — 500 handcrafted levels across eight difficulty tiers.',
    features:['500 handcrafted levels','Eight difficulty tiers','Progress stored on device'],
    policyUrl:'https://kaushalbahl007.github.io/tube_sort_privacy_policy/',
  },
  {
    id:'snake-tangle', name:'Snake Tangle: Snake Game', type:'Game', tag:'Arcade',
    pkg:'com.snaketangle.app', mark:'⌁', color:'#30d158', accent:'green',
    icon:'/icons/snake-tangle.png',
    shots:['/shots/snake-tangle-1.jpg','/shots/snake-tangle-2.jpg','/shots/snake-tangle-3.jpg','/shots/snake-tangle-4.jpg'],
    description:'The classic reflex game, rebuilt with endless mode, challenge levels, time attack and daily challenges — fully offline, no wifi required.',
    features:['Endless, challenge and time attack','Daily challenges','Plays fully offline'],
    policyUrl:'https://kaushalbahl007.github.io/snakeTanglePolicy/',
  },
  {
    id:'docsnap', name:'DocSnap: PDF Scanner & Editor', type:'Utility', tag:'Documents',
    pkg:'com.docsnap.app', mark:'▤', color:'#cf9f57', accent:'gold',
    icon:'/icons/docsnap.png',
    shots:['/shots/docsnap-1.jpg','/shots/docsnap-2.jpg','/shots/docsnap-3.jpg','/shots/docsnap-4.jpg'],
    description:'Scan, sign, merge and edit PDFs entirely on-device — no watermark, no sign-up and no ads.',
    features:['Scan, sign, merge and edit PDFs','On-device OCR with ML Kit','No watermark, no sign-up'],
    policyUrl:'https://kaushalbahl007.github.io/docflow-privacy/',
  },
  {
    id:'jyotish', name:'Jyotish: Janam Kundli & Dasha', type:'Utility', tag:'Astrology',
    pkg:'in.jyotishapp.vedic', mark:'☼', color:'#c97260', accent:'red',
    icon:'/icons/jyotish.png',
    shots:['/shots/jyotish-1.jpg','/shots/jyotish-2.jpg','/shots/jyotish-3.jpg','/shots/jyotish-4.jpg'],
    description:'Birth charts, Vimshottari dashas, Panchang and kundli matching calculated fully offline — no birth details are uploaded to any server.',
    features:['Janam kundli and Vimshottari dasha','Panchang and kundli matching','Calculated fully on-device'],
    policyUrl:'https://kaushalbahl007.github.io/jyotish-privacy/',
  },
]

const SUPPORT_EMAIL = 'kaushalbahl007@gmail.com'
/* Links to a published listing — the developer profile URL isn't a stable/known id. */
const PLAY_DEV = PLAY + apps[0].pkg

/* ---------- Motion presets ---------- */
const ease = [0.16, 1, 0.3, 1]
const pageTransition = {
  initial:{ opacity:0, y:12 },
  animate:{ opacity:1, y:0, transition:{ duration:.5, ease } },
  exit:{ opacity:0, y:-8, transition:{ duration:.25, ease:'easeIn' } },
}
/* Scroll reveal via IntersectionObserver.
   The element is made visible on intersect OR on a short mount timeout,
   whichever comes first — so content can never be stranded at opacity 0 if
   the observer never fires (prerender, headless capture, odd viewports). */
function useReveal(){
  const ref = useRef(null)
  const [shown,setShown] = useState(false)
  useEffect(()=>{
    const el = ref.current
    if(!el || shown) return
    let io
    if(typeof IntersectionObserver !== 'undefined'){
      io = new IntersectionObserver(([e])=>{
        if(e.isIntersecting){ setShown(true); io.disconnect() }
      },{ rootMargin:'0px 0px -40px 0px' })
      io.observe(el)
    }
    // Safety net: reveal regardless if the observer hasn't fired.
    const t = setTimeout(()=>setShown(true), 1200)
    return ()=>{ io?.disconnect(); clearTimeout(t) }
  },[shown])
  return [ref, shown]
}

function Rise({delay=0, as:Tag='div', className, children, ...rest}){
  const [ref,shown] = useReveal()
  return (
    <Tag ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(26px)',
        transition:`opacity .7s ${delay}s cubic-bezier(.16,1,.3,1), transform .7s ${delay}s cubic-bezier(.16,1,.3,1)`,
      }}
      {...rest}>
      {children}
    </Tag>
  )
}

const playUrl = (app) => PLAY + app.pkg

/* Real Play Store artwork. The glyph sits underneath as a backdrop so the tile
   still reads correctly while the image decodes (or if it never arrives) —
   we don't swap it out on error, which previously blanked icons whenever the
   CDN rate-limited a burst of requests. */
function AppIcon({app, large=false}){
  return (
    <div className={`app-icon ${large ? 'large' : ''}`} style={{'--accent-c':app.color}}>
      <span aria-hidden="true">{app.mark}</span>
      {app.icon && <img src={app.icon} alt={`${app.name} app icon`} decoding="async"/>}
    </div>
  )
}

/* Official Play triangle, drawn inline so it stays crisp and needs no request. */
const PlayGlyph = () => (
  <svg className="play-glyph" viewBox="0 0 512 512" aria-hidden="true" focusable="false">
    <path fill="#00D3FF" d="M47 18 322 293l-77 77L47 172a35 35 0 0 1-10-25V43c0-10 4-19 10-25z"/>
    <path fill="#00F076" d="M47 18a35 35 0 0 1 36-3l312 172-73 73L47 18z"/>
    <path fill="#FFCE00" d="M395 187c24 13 24 47 0 60l-73 40-73-73 73-73 73 46z"/>
    <path fill="#FF3A44" d="M83 497a35 35 0 0 1-36-3l275-275 73 73-312 205z"/>
  </svg>
)

const StoreButton = ({app}) =>
  <a className="store-button" href={playUrl(app)} target="_blank" rel="noopener noreferrer"
     aria-label={`Get ${app.name} on Google Play`}>
    <PlayGlyph/>
    <span><small>Get it on</small><strong>Google Play</strong></span>
  </a>

/* ---------- Theme ---------- */
function useTheme(){
  const [theme,setTheme] = useState(() => {
    const saved = typeof localStorage !== 'undefined' && localStorage.getItem('bz-theme')
    if(saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme)
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#000000' : '#fbfbfd')
    try{ localStorage.setItem('bz-theme', theme) }catch{}
  },[theme])
  return [theme, ()=>setTheme(t => t === 'dark' ? 'light' : 'dark')]
}

/* Reading-progress bar under the header. Uses a CSS scroll-driven animation
   where supported and falls back to a passive scroll listener elsewhere. */
function ScrollProgress(){
  const ref = useRef(null)
  useEffect(()=>{
    if(CSS?.supports?.('animation-timeline: scroll()')) return  // CSS handles it
    const el = ref.current
    if(!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      el.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`
    }
    const onScroll = () => { if(!raf) raf = requestAnimationFrame(update) }
    update()
    addEventListener('scroll', onScroll, { passive:true })
    addEventListener('resize', onScroll, { passive:true })
    return ()=>{ removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  },[])
  return <div className="scroll-progress" ref={ref}/>
}

function ScrollToTop(){
  const { pathname } = useLocation()
  useEffect(()=>{ window.scrollTo({ top:0, behavior:'instant' in window ? 'instant' : 'auto' }) },[pathname])
  return null
}

/* ---------- Chrome ---------- */
function Header(){
  const [open,setOpen] = useState(false)
  const [theme,toggleTheme] = useTheme()
  const { pathname } = useLocation()
  const links = [['/apps','Apps'],['/games','Games'],['/utilities','Utilities'],['/support','Support'],['/privacy','Privacy']]
  useEffect(()=>{ setOpen(false) },[pathname])
  return (
    <header>
      <Link className="brand" to="/">
        <span className="brand-mark">B</span><span>BENZENE<br/>STUDIO</span>
      </Link>
      <nav className={open?'open':''}>
        {links.map(([to,label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
        <Link className="nav-contact" to="/contact">Contact <b>↗</b></Link>
      </nav>
      <div style={{display:'flex',alignItems:'center'}}>
        <button className="theme-toggle" onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {theme === 'dark' ? '☀' : '☾'}
        </button>
        <button className={`menu ${open?'open':''}`} onClick={()=>setOpen(!open)}
          aria-label="Toggle menu" aria-expanded={open}><span/><span/></button>
      </div>
    </header>
  )
}

function Footer(){
  return (
    <footer>
      <div className="footer-brand">
        <Link className="brand" to="/"><span className="brand-mark">B</span><span>BENZENE<br/>STUDIO</span></Link>
        <p>Small apps. Good games.<br/>Built with care.</p>
      </div>
      <div><h5>Explore</h5><Link to="/apps">All apps</Link><Link to="/games">Games</Link><Link to="/utilities">Utilities</Link><Link to="/about">About</Link></div>
      <div><h5>Help</h5><Link to="/support">Support</Link><Link to="/privacy">Privacy center</Link><Link to="/terms">Terms of use</Link><Link to="/delete-data">Data deletion</Link></div>
      <div><h5>Connect</h5><a href={`mailto:${SUPPORT_EMAIL}`}>Email us</a><a href={PLAY_DEV} target="_blank" rel="noopener noreferrer">Google Play</a><Link to="/contact">Contact</Link></div>
      <small className="copyright">© 2026 Kaushal Kumar · Benzene Studio</small>
    </footer>
  )
}

function PageIntro({eyebrow,title,body}){
  return (
    <section className="page-intro">
      <motion.p className="eyebrow" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.5,ease}}>{eyebrow}</motion.p>
      <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.06,ease}}>{title}</motion.h1>
      {body && <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.6,delay:.18,ease}}>{body}</motion.p>}
    </section>
  )
}

function AppCard({app, index=0}){
  return (
    <Rise delay={Math.min(index,6)*.05}>
      <Link to={`/apps/${app.id}`} className="app-card">
        <AppIcon app={app}/>
        <div>
          <span className="card-type">{app.type} · {app.tag}</span>
          <h3>{app.name}</h3>
          <p>{app.description}</p>
        </div>
        <b className="arrow">↗</b>
      </Link>
    </Rise>
  )
}

/* ---------- Pages ---------- */
const pad = (n) => String(n).padStart(2,'0')


function Home(){
  const featured = [apps[0], apps[4], apps[6]]
  const games = apps.filter(a=>a.type==='Game').length
  const utils = apps.filter(a=>a.type==='Utility').length
  return (
    <>
      <section className="hero">
        <div className="glow glow-one"/><div className="glow glow-two"/>
        <motion.p className="eyebrow" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.6,ease}}>Independent app studio</motion.p>
        <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.85,delay:.08,ease}}>
          Small apps.<br/><em>Good games.</em><br/>Built with care.
        </motion.h1>
        <motion.p className="hero-copy" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.75,delay:.24,ease}}>
          Puzzle games, useful tools and privacy-conscious apps, thoughtfully made by one independent developer.
        </motion.p>
        <motion.div className="hero-actions" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.75,delay:.36,ease}}>
          <Link className="button primary" to="/apps">Explore apps <b>↓</b></Link>
          <a className="button ghost" href="#all-apps">Browse all {apps.length} <b>↘</b></a>
        </motion.div>
      </section>
      <div className="hero-rule"/>

      <section className="stats">
        {[[apps.length,'Apps'],[games,'Games'],[utils,'Utilities'],[1,'Developer']].map(([num,label],i)=>
          <Rise delay={i*.07} key={label}><b>{pad(num)}</b><span>{label}</span></Rise>
        )}
      </section>

      <section id="featured" className="section">
        <Rise className="section-top" >
          <div>
            <p className="eyebrow">A few favorites</p>
            <h2>Built to be<br/><em>enjoyed.</em></h2>
          </div>
          <Link to="/apps" className="text-link">View all apps <b>→</b></Link>
        </Rise>
        <div className="featured-grid">
          {featured.map((app,index)=>
            <Rise as="article" delay={index*.1} className={`featured-card ${app.accent}`} key={app.id} >
              <div className="card-halo"/>
              <AppIcon app={app} large/>
              <span className="card-type">{app.type}</span>
              <h3>{app.name}</h3>
              <p>{app.description}</p>
              <div><StoreButton app={app}/><Link to={`/apps/${app.id}`} className="mini-link">Details ↗</Link></div>
            </Rise>
          )}
        </div>
      </section>

      {/* Every app, right on the home page — no navigation needed to find one. */}
      <section id="all-apps" className="section catalog">
        <Rise className="section-top">
          <div>
            <p className="eyebrow">The whole catalog</p>
            <h2>All {apps.length} apps,<br/><em>one tap away.</em></h2>
          </div>
        </Rise>

        {['Game','Utility'].map(kind=>{
          const list = apps.filter(a=>a.type===kind)
          return (
            <div key={kind} className="catalog-group">
              <Rise className="catalog-label">
                <h3>{kind==='Game' ? 'Games' : 'Utilities'}</h3>
                <span>{list.length}</span>
              </Rise>
              <div className="mini-grid">
                {list.map((app,i)=>
                  <Rise key={app.id} delay={Math.min(i,5)*.05} className="mini-card">
                    {/* Card links to details; the Play badge is a sibling so the
                        two anchors never nest (invalid HTML). */}
                    <Link to={`/apps/${app.id}`} className="mini-card-main">
                      <AppIcon app={app}/>
                      <div className="mini-card-text">
                        <strong>{app.name}</strong>
                        <span>{app.tag}</span>
                      </div>
                    </Link>
                    <a className="mini-get" href={playUrl(app)} target="_blank"
                       rel="noopener noreferrer"
                       aria-label={`Get ${app.name} on Google Play`}>
                      <PlayGlyph/>
                    </a>
                  </Rise>
                )}
              </div>
            </div>
          )
        })}
      </section>

      <Rise as="section" className="statement" >
        <p className="eyebrow">Our approach</p>
        <h2>Less noise.<br/><em>More delight.</em></h2>
        <p>We make focused products that feel good to use—without the clutter, accounts or complexity you don’t need.</p>
        <Link className="text-link" to="/about">About Benzene Studio <b>→</b></Link>
      </Rise>

      <Rise as="section" className="privacy-banner" >
        <span className="privacy-seal">✦</span>
        <div>
          <p className="eyebrow">Privacy, plainly</p>
          <h2>Your data deserves<br/>a little respect.</h2>
        </div>
        <p>Every app has a clear, app-specific privacy policy. No guesswork. No legal fog.</p>
        <Link className="button light" to="/privacy">Privacy center <b>→</b></Link>
      </Rise>
    </>
  )
}

function AppListing({filter}){
  const shown = filter ? apps.filter(a=>a.type===filter) : apps
  return (
    <>
      <PageIntro
        eyebrow={filter ? `${filter} collection` : 'The full collection'}
        title={filter==='Game' ? 'Good games, no fuss.' : filter==='Utility' ? 'Useful by design.' : 'Apps with a point.'}
        body={filter==='Game' ? 'Small, satisfying games for a quick break or a longer unwind.'
          : filter==='Utility' ? 'Focused tools that get out of your way.'
          : 'Eight focused products, all built with the same care.'}/>
      <section className="app-grid">
        {shown.map((a,i)=><AppCard app={a} index={i} key={a.id}/>)}
      </section>
    </>
  )
}

function AppPage(){
  const { id } = useParams()
  const app = apps.find(a=>a.id===id) || apps[0]
  return (
    <>
      <section className={`app-hero ${app.accent}`}>
        <div className="app-hero-glow" style={{'--accent-c':app.color}}/>
        <motion.div initial={{opacity:0,scale:.85,rotate:-8}} animate={{opacity:1,scale:1,rotate:0}} transition={{duration:.8,ease}}>
          <AppIcon app={app} large/>
        </motion.div>
        <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.75,delay:.12,ease}}>
          <p className="eyebrow">{app.type} · {app.tag}</p>
          <h1>{app.name}</h1>
          <p>{app.description}</p>
          <div className="hero-row">
            <StoreButton app={app}/>
            <span className="pkg">{app.pkg}</span>
          </div>
        </motion.div>
      </section>

      <section className="detail-grid">
        <Rise >
          <p className="eyebrow">Made with intention</p>
          <h2>Simple to start.<br/><em>Hard to put down.</em></h2>
        </Rise>
        <Rise as="ul" delay={.1} >
          {app.features.map(f=><li key={f}><span>✦</span>{f}</li>)}
        </Rise>
      </section>

      <section className="screens">
        <Rise >
          <p className="eyebrow">A closer look</p>
          <h2>Made to feel right.</h2>
        </Rise>
        <div className="screen-row">
          {(app.shots || []).map((src,n)=>
            <Rise delay={n*.1} className="phone-screen" key={src}>
              <img src={src} alt={`${app.name} screenshot ${n+1}`} loading="lazy" decoding="async"/>
            </Rise>
          )}
        </div>
      </section>

      <section className="app-links">
        <Rise >
          <span>Privacy</span>
          <h3>Clear and specific.</h3>
          <p>Read how this app handles information.</p>
          <Link to={`/privacy/${app.id}`}>Read privacy policy →</Link>
        </Rise>
        <Rise delay={.1} >
          <span>Support</span>
          <h3>Need a hand?</h3>
          <p>Questions, feedback, or a bug to report.</p>
          <Link to={`/support/${app.id}`}>Get support →</Link>
        </Rise>
      </section>
    </>
  )
}

function Support({privacy=false}){
  const { id } = useParams()
  const app = id && apps.find(a=>a.id===id)
  const policy = app ? policies[app.id] : null

  if(app) return (
    <>
      <PageIntro
        eyebrow={privacy ? 'Privacy policy' : 'Support'}
        title={`${app.name}.`}
        body={privacy ? `The full privacy policy for ${app.name}, last updated ${policy.updated}.` : `Here’s how we can help with ${app.name}.`}/>
      {/* Animate on mount, not on scroll: this block sits in the initial viewport,
          and legal copy must never depend on an observer firing to become visible. */}
      <motion.section className="legal"
        initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.15,ease}}>
        {privacy ? <>
          <div className="policy-meta">
            <div><span>App</span><strong>{app.name}</strong></div>
            <div><span>Package</span><strong>{app.pkg}</strong></div>
            <div><span>Last updated</span><strong>{policy.updated}</strong></div>
          </div>
          {/* Rendered verbatim from the published policy — see src/policies.js */}
          {policy.sections.map((sec,si)=>{
            const blocks = []
            let list = null
            sec.body.forEach(([kind,text],bi)=>{
              if(kind === 'li'){
                if(!list){ list = []; blocks.push({t:'ul', items:list}) }
                list.push(<li key={bi}>{text}</li>)
              } else if(kind === 'lab'){
                list = null
                blocks.push({t:'p', node:<h4 className="policy-sub" key={bi}>{text}</h4>})
              } else {
                list = null
                blocks.push({t:'p', node:<p key={bi}>{text}</p>})
              }
            })
            return (
              <React.Fragment key={si}>
                {si > 0 && <h3>{sec.h}</h3>}
                {blocks.map((b,i)=> b.t === 'ul'
                  ? <ul className="policy-list" key={i}>{b.items}</ul>
                  : b.node)}
              </React.Fragment>
            )
          })}
          <h3>Contact</h3>
          <p>
            For privacy questions or data-deletion requests relating to {app.name}, email{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>
          <p className="policy-source">
            <a href={app.policyUrl} target="_blank" rel="noopener noreferrer">View the original published policy ↗</a>
          </p>
        </> : <>
          <h2>Common questions</h2>
          <div className="faq">
            <details open><summary>How do I report a problem?<b>+</b></summary><p>Email us with the app name, your device model, and a brief description of what happened.</p></details>
            <details><summary>Can I restore my progress?<b>+</b></summary><p>Progress in {app.name} is stored locally on your device, so it does not transfer between devices and is removed if you uninstall the app.</p></details>
            <details><summary>Does the app require internet access?<b>+</b></summary><p>Most Benzene Studio games play fully offline. A connection is only needed to serve ads or download updates.</p></details>
          </div>
          <p className="support-email">Still need help? <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL} ↗</a></p>
          <p className="policy-source"><Link to={`/privacy/${app.id}`}>Read the {app.name} privacy policy →</Link></p>
        </>}
      </motion.section>
    </>
  )

  return (
    <>
      <PageIntro
        eyebrow={privacy ? 'Privacy center' : 'Support center'}
        title={privacy ? 'Privacy, in plain sight.' : 'How can we help?'}
        body={privacy ? 'Every app has its own policy, published in full here. Choose an app to read it.' : 'Choose an app to find answers or get in touch.'}/>
      <section className="choice-grid">
        {apps.map((a,i)=>
          <Rise key={a.id} delay={Math.min(i,6)*.05}>
            <Link to={`/${privacy?'privacy':'support'}/${a.id}`}>
              <AppIcon app={a}/><span>{a.name}</span><b>→</b>
            </Link>
          </Rise>
        )}
      </section>
    </>
  )
}

function SimplePage({type}){
  const content = {
    about:['About Benzene Studio','Built by one developer.','Kaushal Kumar is a frontend engineer, app developer and game developer creating small, focused applications. The goal is not to build everything. It is to build something useful, make it feel good, and keep it simple.'],
    contact:['Contact','Let’s talk.','Questions, bug reports, business enquiries, feedback, or app support—we’d love to hear from you.'],
    terms:['Terms of use','The simple version.','By using Benzene Studio apps or this website, you agree to use them lawfully and responsibly. Apps, artwork and content are protected by applicable intellectual-property laws. Features and services may change over time.'],
    delete:['Data deletion','Your data, your control.','Most Benzene Studio apps store data locally on your device. To remove it, open Android Settings → Apps → choose the app → Storage → Clear data. If you have questions about a particular app, contact us.'],
  }[type]
  return (
    <>
      <PageIntro eyebrow={content[0]} title={content[1]} body={content[2]}/>
      <motion.section className="simple-content"
        initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.15,ease}}>
        {type==='contact' && <>
          <a className="big-email" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL} ↗</a>
          <p>We typically respond to support emails as soon as we can.</p>
        </>}
        {type==='about' && <div className="quote">“The best products make one thing feel effortless.”</div>}
        {type==='terms' && <>
          <h2>Using our apps</h2>
          <p>Our apps are provided as-is, with no guarantee of uninterrupted availability. Purchases, advertising and third-party services are governed by their respective providers and store policies.</p>
          <h2>Questions</h2>
          <p>Contact <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with questions about these terms.</p>
        </>}
        {type==='delete' && <a className="button primary" href={`mailto:${SUPPORT_EMAIL}`}>Contact support <b>→</b></a>}
      </motion.section>
    </>
  )
}

/* ---------- Shell ---------- */
function AnimatedRoutes(){
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...pageTransition}>
        <Routes location={location}>
          <Route path="/" element={<Home/>}/>
          <Route path="/apps" element={<AppListing/>}/>
          <Route path="/games" element={<AppListing filter="Game"/>}/>
          <Route path="/utilities" element={<AppListing filter="Utility"/>}/>
          <Route path="/apps/:id" element={<AppPage/>}/>
          <Route path="/support" element={<Support/>}/>
          <Route path="/support/:id" element={<Support/>}/>
          <Route path="/privacy" element={<Support privacy/>}/>
          <Route path="/privacy/:id" element={<Support privacy/>}/>
          <Route path="/about" element={<SimplePage type="about"/>}/>
          <Route path="/contact" element={<SimplePage type="contact"/>}/>
          <Route path="/terms" element={<SimplePage type="terms"/>}/>
          <Route path="/delete-data" element={<SimplePage type="delete"/>}/>
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App(){
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Header/>
      <ScrollProgress/>
      <main><AnimatedRoutes/></main>
      <Footer/>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App/>)
