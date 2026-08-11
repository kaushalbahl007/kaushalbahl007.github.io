import React, { useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter, Link, NavLink, Route, Routes, useParams, useLocation } from 'react-router-dom'
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
    policy:{
      updated:'July 12, 2026',
      summary:'Arrow Puzzle Escape does not collect personal information. Your progress stays on your device.',
      sections:[
        ['Information we collect','We do not collect personal information such as your name, email address or phone number. Your game progress — completed levels, stars, points and coins — is stored only on your device and is never sent to us.'],
        ['Advertising','Google AdMob handles advertising in this app and may collect device identifiers, approximate location derived from your IP address, and app interaction data. All transmissions are encrypted.'],
        ['Notifications','Local reminder notifications are generated on your device. No data collection is involved, and they can be disabled at any time from your device settings.'],
        ['Your choices','You can reset your Advertising ID or opt out of personalised ads from your device settings under Privacy → Ads. Uninstalling the app removes all locally stored data.'],
        ['Children','The app is not directed at children under 13. We do not knowingly collect personal information from children.'],
      ],
    },
  },
  {
    id:'flowpath', name:'Flow Path: Pipe Puzzle Game', type:'Game', tag:'Pipe puzzle',
    pkg:'com.flowpath.game', mark:'✦', color:'#7a9a86', accent:'green',
    icon:'/icons/flowpath.png',
    shots:['/shots/flowpath-1.png','/shots/flowpath-2.jpg','/shots/flowpath-3.jpg','/shots/flowpath-4.jpg'],
    description:'Connect matching colour dots with flowing pipes until every cell on the board fills — a calmer, more meditative take on the classic pipe genre.',
    features:['Relaxed, meditative pacing','Progress stored locally','Plays fully offline'],
    policyUrl:'https://kaushalbahl007.github.io/PATHFLOW-privacy-policy/',
    policy:{
      updated:'April 18, 2026',
      summary:'Flow Path collects no personally identifiable information. Game progress is stored locally on your device only.',
      sections:[
        ['Information we collect','The app itself collects no personally identifiable information. Third-party SDKs gather device identifiers (advertising ID, device model, OS version) and ad interaction metrics. Game progress is stored locally on your device only.'],
        ['Advertising','Google AdMob displays advertisements within Flow Path and may use the identifiers described above to serve them.'],
        ['Your choices','You can opt out of personalised ads in your device settings or reset your advertising identifier at any time. Uninstalling the app deletes all locally stored data.'],
        ['Children','The app is not directed to children under 13.'],
      ],
    },
  },
  {
    id:'ludo', name:'Ludo Indian Adition', type:'Game', tag:'Board game',
    pkg:'com.ludoindianedition', mark:'◉', color:'#c97260', accent:'red',
    icon:'/icons/ludo.png',
    shots:['/shots/ludo-1.png','/shots/ludo-2.png','/shots/ludo-3.png','/shots/ludo-4.png'],
    description:'A modern, vibrant take on the beloved Indian classic, built for smooth local multiplayer between two and four players on one device.',
    features:['Local multiplayer for 2–4 players','Classic rules, modern feel','Quick rounds'],
    policyUrl:'https://kaushalbahl007.github.io/privacy-policy/',
    policy:{
      updated:'April 2026',
      summary:'Ludo Indian Adition collects limited device and usage data to run and improve the game.',
      sections:[
        ['Information we collect','We collect device information (device model, operating system version) and usage data (game activity, session duration), along with IP addresses used for performance optimisation.'],
        ['Third-party services','Google AdMob manages advertisements and Google Firebase provides analytics and crash reporting. Each service handles data under its own privacy policy.'],
        ['Data security','No method of internet transmission or electronic storage is completely secure. We work to protect your information but cannot guarantee absolute security.'],
        ['Children','We do not knowingly collect personal information from children under the age of 13. If such data is discovered, it is removed immediately.'],
        ['Changes','We may update this policy from time to time and will provide notice of material changes.'],
      ],
    },
  },
  {
    id:'block-burst', name:'Block Burst: Wood Puzzle', type:'Game', tag:'Block puzzle',
    pkg:'com.benzenestudio.block_burst', mark:'▦', color:'#8d95a8', accent:'blue',
    icon:'/icons/block-burst.png',
    shots:['/shots/block-burst-1.png','/shots/block-burst-2.jpg','/shots/block-burst-3.jpg','/shots/block-burst-4.jpg'],
    description:'Place wooden blocks on an 8×8 grid and clear full rows and columns before the board fills up — calm on the surface, sharper the longer you play.',
    features:['Endless 8×8 gameplay','Optional one-time ad removal','Progress stored on device'],
    policyUrl:'https://kaushalbahl007.github.io/block_burst_privacy_policy/',
    policy:{
      updated:'May 15, 2026',
      summary:'Block Burst stores game progress on your device only. No personal identifiers, location data or cross-app tracking.',
      sections:[
        ['Information we collect','Only local device storage is used: game progress (scores, levels completed, achievements) and app settings. We collect no personal identifiers, no location data, and perform no cross-app tracking.'],
        ['Third-party services','Google AdMob serves advertisements, Google Play Billing processes purchases, and Android push notifications are generated locally. Benzene Studio does not use Firebase, analytics SDKs, crash reporting tools, or any other third-party data collection services beyond those listed here.'],
        ['In-app purchases','Google Play Billing handles all transactions securely. The developer receives only purchase confirmations and never has access to your payment card information. A one-time purchase removes ads permanently.'],
        ['Children','We do not knowingly collect personal information from children under 13, or the applicable age in your jurisdiction. Because no personal data is collected from any user, privacy risk to children is limited to standard ad content.'],
        ['Contact','Email us and we aim to respond within 48 hours.'],
      ],
    },
  },
  {
    id:'marble-ball-sort', name:'Marble Ball Sort: Tube Puzzle', type:'Game', tag:'Colour sorting',
    pkg:'com.tubesort.puzzle', mark:'●', color:'#cf9f57', accent:'gold',
    icon:'/icons/marble-ball-sort.png',
    shots:['/shots/marble-ball-sort-1.jpg','/shots/marble-ball-sort-2.jpg','/shots/marble-ball-sort-3.jpg','/shots/marble-ball-sort-4.jpg'],
    description:'Sort coloured marbles into matching tubes, one careful move at a time — 500 handcrafted levels across eight difficulty tiers.',
    features:['500 handcrafted levels','Eight difficulty tiers','Progress stored on device'],
    policyUrl:'https://kaushalbahl007.github.io/tube_sort_privacy_policy/',
    policy:{
      updated:'May 16, 2026',
      summary:'Marble Ball Sort does not directly collect personal information. All game progress stays on your device.',
      sections:[
        ['Information we collect','We do not directly collect personal information such as your name or email address. Third-party services automatically gather device model, OS version, unique device identifiers, gameplay metrics and advertising identifiers.'],
        ['Third-party services','Google AdMob provides advertising and Google Play Services supports app delivery and analytics. Each maintains its own privacy policy, which we encourage you to review.'],
        ['Data storage','All game progress remains stored locally on your device. No data is uploaded to external servers.'],
        ['Children','We do not knowingly collect personal information from children under the age of 13. Parents with concerns should contact us directly.'],
      ],
    },
  },
  {
    id:'snake-tangle', name:'Snake Tangle: Snake Game', type:'Game', tag:'Arcade',
    pkg:'com.snaketangle.app', mark:'⌁', color:'#30d158', accent:'green',
    icon:'/icons/snake-tangle.png',
    shots:['/shots/snake-tangle-1.jpg','/shots/snake-tangle-2.jpg','/shots/snake-tangle-3.jpg','/shots/snake-tangle-4.jpg'],
    description:'The classic reflex game, rebuilt with endless mode, challenge levels, time attack and daily challenges — fully offline, no wifi required.',
    features:['Endless, challenge and time attack','Daily challenges','Plays fully offline'],
    policyUrl:'https://kaushalbahl007.github.io/snakeTanglePolicy/',
    policy:{
      updated:'May 2026',
      summary:'Snake Tangle stores progress locally and integrates no analytics SDKs. Rated for ages 3+ with non-personalised ads for under-13s.',
      sections:[
        ['Information we collect','Game progress is stored locally using SharedPreferences. We do not collect personal identifiers such as names, email addresses or location data.'],
        ['Advertising','Google AdMob may gather device identifiers, IP address and usage data to serve personalised or contextual advertisements.'],
        ['Third-party services','Google AdMob is the only external SDK integrated. There are no analytics SDKs (such as Firebase Analytics or Crashlytics), no social media integrations, no marketing platforms and no data brokers.'],
        ['Children','The app is rated for ages 3+ and complies with COPPA by serving non-personalised ads to users under 13. There are no chat features, social networking, user-generated content, or any feature that would allow a child to share personal information.'],
        ['Contact','We aim to respond to support enquiries within 48 hours on business days.'],
      ],
    },
  },
  {
    id:'docsnap', name:'DocSnap: PDF Scanner & Editor', type:'Utility', tag:'Documents',
    pkg:'com.docsnap.app', mark:'▤', color:'#cf9f57', accent:'gold',
    icon:'/icons/docsnap.png',
    shots:['/shots/docsnap-1.jpg','/shots/docsnap-2.jpg','/shots/docsnap-3.jpg','/shots/docsnap-4.jpg'],
    description:'Scan, sign, merge and edit PDFs entirely on-device — no watermark, no sign-up and no ads.',
    features:['Scan, sign, merge and edit PDFs','On-device OCR with ML Kit','No watermark, no sign-up'],
    policyUrl:'https://kaushalbahl007.github.io/docflow-privacy/',
    policy:{
      updated:'July 17, 2026',
      summary:'DocSnap does not collect, transmit or store your documents. Everything is processed on your device.',
      sections:[
        ['Information we collect','DocSnap does not collect, transmit or store your document contents, OCR text, signatures, personal identifiers or location data. All processing happens locally on your device.'],
        ['On-device processing','Scanning, image imports, biometric vault access, reminders and OCR all run on your device using Google ML Kit’s on-device models. Document text is not sent to Google.'],
        ['Permissions','The app requests camera, photos and storage, biometric authentication, notifications, internet access and advertising ID — each limited strictly to the purpose stated in the app.'],
        ['Third-party services','ML Kit, AdMob and Google Play Services are used. AdMob collects device identifiers and general device information for advertising, but never your document contents.'],
        ['Your rights','You can delete documents, revoke permissions, clear the cache or uninstall the app at any time to remove all local data.'],
        ['Children','The app is not directed at children under 13.'],
      ],
    },
  },
  {
    id:'jyotish', name:'Jyotish: Janam Kundli & Dasha', type:'Utility', tag:'Astrology',
    pkg:'in.jyotishapp.vedic', mark:'☼', color:'#c97260', accent:'red',
    icon:'/icons/jyotish.png',
    shots:['/shots/jyotish-1.jpg','/shots/jyotish-2.jpg','/shots/jyotish-3.jpg','/shots/jyotish-4.jpg'],
    description:'Birth charts, Vimshottari dashas, Panchang and kundli matching calculated fully offline — no birth details are uploaded to any server.',
    features:['Janam kundli and Vimshottari dasha','Panchang and kundli matching','Calculated fully on-device'],
    policyUrl:'https://kaushalbahl007.github.io/jyotish-privacy/',
    policy:{
      updated:'July 2026',
      summary:'Your birth data belongs to you, not us. Birth details never leave your device.',
      sections:[
        ['Information we collect','To generate astrological charts the app asks for your name, date of birth, time of birth and place of birth (city or coordinates). This information stays exclusively on your device.'],
        ['How birth details are handled','Birth data is stored only on your device using local SQLite storage and is never transmitted to any server, cloud or third party. All calculations run locally, and core features work without an internet connection.'],
        ['Third-party services','Google AdMob serves advertisements and may collect your advertising ID, device identifiers, IP address, ad interactions and app activity. Google Fonts may receive your IP address when fonts are downloaded.'],
        ['Your choices','You can opt out of personalised ads through your device settings. Deleting a profile or uninstalling the app removes the stored birth data from your device.'],
        ['Children','Jyotish is not directed at children under the age of 13. We do not knowingly collect personal information from children.'],
      ],
    },
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

const StoreButton = ({app}) =>
  <a className="store-button" href={playUrl(app)} target="_blank" rel="noopener noreferrer">
    <small>Get it on</small><strong>Google Play</strong>
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
          <a className="button ghost" href="#featured">View featured <b>↘</b></a>
        </motion.div>
      </section>
      <div className="hero-rule"/>

      <section className="stats">
        {[[pad(apps.length),'Apps'],[pad(games),'Games'],[pad(utils),'Utilities'],['01','Developer']].map(([num,label],i)=>
          <Rise delay={i*.07} key={label} ><b>{num}</b><span>{label}</span></Rise>
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

  if(app) return (
    <>
      <PageIntro
        eyebrow={privacy ? 'Privacy policy' : 'Support'}
        title={`${app.name}.`}
        body={privacy ? `The full privacy policy for ${app.name}, last updated ${app.policy.updated}.` : `Here’s how we can help with ${app.name}.`}/>
      {/* Animate on mount, not on scroll: this block sits in the initial viewport,
          and legal copy must never depend on an observer firing to become visible. */}
      <motion.section className="legal"
        initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.15,ease}}>
        {privacy ? <>
          <div className="policy-meta">
            <div><span>App</span><strong>{app.name}</strong></div>
            <div><span>Package</span><strong>{app.pkg}</strong></div>
            <div><span>Last updated</span><strong>{app.policy.updated}</strong></div>
          </div>
          <p className="policy-lede">{app.policy.summary}</p>
          {app.policy.sections.map(([heading,body])=>
            <React.Fragment key={heading}>
              <h3>{heading}</h3>
              <p>{body}</p>
            </React.Fragment>
          )}
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
      <main><AnimatedRoutes/></main>
      <Footer/>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App/>)
