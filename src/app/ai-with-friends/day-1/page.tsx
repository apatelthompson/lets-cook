import './slides.css';
import DeckStage from './DeckStage';

export const metadata = {
  title: 'AI 101 — Day 1 · The Foundations',
};

const Foot = ({ label }: { label: string }) => (
  <div className="foot">
    <strong>aligned <em>ai</em> learning labs</strong>
    <span className="dot" />
    <span>{label}</span>
  </div>
);

const slides = [
  // 01 · COVER
  <section className="slide s-cover" key="01">
    <div className="frame">
      <div className="eyebrow">aligned ai · ai with friends</div>
      <h1 className="title" style={{ marginTop: 24 }}>
        AI 101 — <em>day&nbsp;01</em><br />the foundations.
      </h1>
      <div className="meta">
        <span className="pill"><strong>90 min</strong></span>
        <span className="pill">ai with friends · cohort 01</span>
        <span className="pill">avni patel thompson</span>
      </div>
    </div>
    <Foot label="cover" />
  </section>,

  // 02 · GOAL
  <section className="slide s-goal" key="02">
    <div className="frame">
      <div className="eyebrow label">today's goal</div>
      <h2 className="statement">keep you in the <em>driver's seat</em> — knowing when and how to use AI.</h2>
      <p className="qual">by the end: you can explain what AI is (and isn't) to a friend, and you have your own mental model for evaluating every new development.</p>
    </div>
    <Foot label="day 01 · goal" />
  </section>,

  // 03 · ABOUT ME — original 4-card grid + media (photo + gif)
  <section className="slide s-about" key="03">
    <div className="frame">
      <div className="header">
        <div className="eyebrow">before we start</div>
        <h2 className="title-md">hi, I'm avni.</h2>
      </div>
      <div className="body-row">
        <div className="media">
          <div className="photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/avni-family.jpg" alt="avni and family at the us open" />
          </div>
          <div className="gif">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/photos/milo-events.gif" alt="milo events animation" />
          </div>
        </div>
        <div className="grid">
          <div className="item">
            <div className="n">what I do</div>
            <div className="h">builder + advisor.</div>
            <p className="p">I build products at the seams of family life, work, and AI — and teach non-technical people how to use AI without losing themselves in the noise.</p>
          </div>
          <div className="item">
            <div className="n">what I've built</div>
            <div className="h">milo · ai with friends · the mission matrix.</div>
            <p className="p">plus a few that shipped quietly. lots of pattern-spotting from the inside.</p>
          </div>
          <div className="item">
            <div className="n">why this workshop</div>
            <div className="h">the noise is the hardest part.</div>
            <p className="p">most people don't need more tools — they need a frame for what they're looking at. that's what these four sessions are.</p>
          </div>
          <div className="item">
            <div className="n">where to find me</div>
            <div className="h">thisbeautifulchaos.org</div>
            <p className="p">any time during these sessions, just ask. that's the whole point of "with friends."</p>
          </div>
        </div>
      </div>
    </div>
    <Foot label="about me" />
  </section>,

  // 04 · QUICK INTROS
  <section className="slide s-overview" key="04">
    <div className="frame">
      <div className="eyebrow">quick round</div>
      <h2 className="title-md">three things, ~30 seconds each.</h2>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="item">
          <div className="n">01</div>
          <div className="h">your name.</div>
          <p className="p">and 3 things about you (location, work, family, etc.).</p>
        </div>
        <div className="item">
          <div className="n">02</div>
          <div className="h">where AI shows up in your life right now.</div>
          <p className="p">work, home, kids, hobbies — wherever.</p>
        </div>
        <div className="item">
          <div className="n">03</div>
          <div className="h">one thing you want to leave today understanding.</div>
          <p className="p">no wrong answers. we'll come back to these.</p>
        </div>
      </div>
    </div>
    <Foot label="intros" />
  </section>,

  // 05 · ARC of 4 sessions (colored boxes)
  <section className="slide s-overview" key="05">
    <div className="frame">
      <div className="eyebrow">the arc</div>
      <h2 className="title-md">four sessions, one floor under your feet.</h2>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="item pebble">
          <div className="n">101 · day 1</div>
          <div className="h">discernment.</div>
          <p className="p">today. mental models for what AI actually is.</p>
        </div>
        <div className="item lime">
          <div className="n">101 · day 2</div>
          <div className="h">capability.</div>
          <p className="p">tools, prompts, memory, skills — hands on.</p>
        </div>
        <div className="item peach">
          <div className="n">201 · day 1</div>
          <div className="h">agentic thinker.</div>
          <p className="p">from chat to action. agents and harnesses.</p>
        </div>
        <div className="item lavender">
          <div className="n">201 · day 2</div>
          <div className="h">intentional builder.</div>
          <p className="p">build the thing that's right for you.</p>
        </div>
      </div>
    </div>
    <Foot label="the arc" />
  </section>,

  // 06 · MISSION MATRIX preview — with axes labeled
  <section className="slide s-matrix-preview" key="06">
    <div className="frame">
      <div className="copy">
        <div className="mark">"</div>
        <h2 className="headline">lead with the <em>role</em> — not the tool.</h2>
        <p className="by"><strong>the mission matrix.</strong> we'll come back to it next week. today: just know it exists.</p>
      </div>
      <div className="matrix-wrap">
        <div className="axis-top"><span>← low meaning</span><span className="center">depth of meaning</span><span>high meaning →</span></div>
        <div className="axis-left"><span>low expertise</span><span className="center">depth of expertise</span><span>high expertise</span></div>
        <div className="matrix">
          <div className="quad coach">
            <div className="which">enable the previously impossible</div>
            <div className="name">coach</div>
            <div className="role">challenge &amp; push</div>
          </div>
          <div className="quad bodyguard">
            <div className="which">filter noise + create a forcefield</div>
            <div className="name">bodyguard</div>
            <div className="role">protect &amp; make space</div>
          </div>
          <div className="quad intern">
            <div className="which">automate with transparency</div>
            <div className="name">intern</div>
            <div className="role">automate &amp; remove</div>
          </div>
          <div className="quad partner">
            <div className="which">assist and learn</div>
            <div className="name">partner</div>
            <div className="role">lighten the load</div>
          </div>
        </div>
        <div className="axis-bottom"><span /><span /><span /></div>
      </div>
    </div>
    <Foot label="mission matrix · preview" />
  </section>,

  // 07 · AGENDA (the next 75 min)
  <section className="slide s-overview" key="07">
    <div className="frame">
      <div className="eyebrow">the next 75 minutes</div>
      <h2 className="title-md">how we'll spend the rest of today.</h2>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="item pebble">
          <div className="n">~10 min</div>
          <div className="h">get warm.</div>
          <p className="p">three tabs. same prompt. notice how different they feel.</p>
        </div>
        <div className="item lime">
          <div className="n">~20 min</div>
          <div className="h">what AI actually is.</div>
          <p className="p">how it's made, tokens, why same prompt → different answers.</p>
        </div>
        <div className="item peach">
          <div className="n">~12 min</div>
          <div className="h">the context lab.</div>
          <p className="p">three rounds, one question. feel the difference between context and memory.</p>
        </div>
        <div className="item lavender">
          <div className="n">~15 min</div>
          <div className="h">failure modes + your data.</div>
          <p className="p">hallucinations, sycophancy, alignment. plus: turn off training.</p>
        </div>
        <div className="item coral">
          <div className="n">~10 min</div>
          <div className="h">create vs do.</div>
          <p className="p">the most useful frame for the next two years of AI noise.</p>
        </div>
        <div className="item ocean">
          <div className="n">~8 min</div>
          <div className="h">your mission matrix.</div>
          <p className="p">a values-first assessment. find where AI fits — and where it doesn't.</p>
        </div>
      </div>
    </div>
    <Foot label="agenda" />
  </section>,

  // 08 · OPEN ALL THREE TABS — tool tour
  <section className="slide s-tools" key="08">
    <div className="frame">
      <div>
        <div className="eyebrow">right now, on your laptop</div>
        <h2 className="title-md" style={{ marginTop: 16 }}>open all three. sign in. we're about to use them.</h2>
      </div>
      <div className="row">
        <div className="tool t-pebble">
          <div className="mark">claude</div>
          <div className="by">anthropic</div>
          <p className="what">thoughtful generalist. long answers, careful reasoning.</p>
          <p className="good">good for: writing, thinking out loud, careful analysis</p>
          <a className="link" href="https://claude.ai" target="_blank" rel="noreferrer">claude.ai</a>
        </div>
        <div className="tool t-lime">
          <div className="mark">chatgpt</div>
          <div className="by">openai</div>
          <p className="what">the household name. strong tool ecosystem, voice, image gen built in.</p>
          <p className="good">good for: variety, voice, ecosystem fluency</p>
          <a className="link" href="https://chatgpt.com" target="_blank" rel="noreferrer">chatgpt.com</a>
        </div>
        <div className="tool t-peach">
          <div className="mark">gemini</div>
          <div className="by">google</div>
          <p className="what">plugged into your google life. search-grounded, fast on facts.</p>
          <p className="good">good for: live info, workspace, big-context docs</p>
          <a className="link" href="https://gemini.google.com" target="_blank" rel="noreferrer">gemini.google.com</a>
        </div>
      </div>
    </div>
    <Foot label="setup" />
  </section>,

  // 09 · LAB 1 — THE BAKE-OFF
  <section className="slide s-lab" key="09">
    <div className="frame">
      <div className="eyebrow">🧪 lab 01 · ~7 minutes</div>
      <h2 className="title">the bake-off.</h2>
      <p className="body">paste this prompt into <em>all three</em> tabs. read all three answers.</p>
      <div className="prompt-box">
        <span className="label">the prompt</span>
        I'm thinking about quitting my job to start a bakery. talk me through it.
      </div>
      <div className="row">
        <div className="col">
          <div className="h">notice the tone.</div>
          <p className="p">who feels like a friend? who feels like a consultant?</p>
        </div>
        <div className="col">
          <div className="h">notice the structure.</div>
          <p className="p">bullets vs paragraphs. headers vs flow. who's giving you a deck?</p>
        </div>
        <div className="col">
          <div className="h">notice who pushes back.</div>
          <p className="p">who agrees with you? who challenges? who hedges?</p>
        </div>
      </div>
    </div>
    <Foot label="lab 01 · bake-off" />
  </section>,

  // 10 · BAKE-OFF DEBRIEF
  <section className="slide s-check" key="10">
    <div className="frame">
      <div className="eyebrow">debrief · 5 min</div>
      <h2 className="question">same prompt, three answers. let's talk it over.</h2>
      <div className="options">
        <div className="opt"><span className="letter">A</span><span>which one would you trust?</span></div>
        <div className="opt"><span className="letter">B</span><span>who pushed back? who flattered?</span></div>
        <div className="opt"><span className="letter">C</span><span>whose voice felt like a friend?</span></div>
        <div className="opt"><span className="letter">D</span><span>did anyone surprise you?</span></div>
      </div>
      <div className="reveal"><strong>holding question:</strong> these are similarly capable models. so why do they feel so different? we're about to find out.</div>
    </div>
    <Foot label="lab 01 · debrief" />
  </section>,

  // 11 · MODELS in plain English
  <section className="slide s-quote" key="11">
    <div className="frame">
      <div className="mark">"</div>
      <p className="body">a model is software that read a lot of text and got <em>very good</em> at guessing what comes next.</p>
      <p className="by"><strong>not understanding.</strong> pattern-matching at scale.</p>
    </div>
    <Foot label="models" />
  </section>,

  // 12 · IT'S NOT SEARCH — moved earlier as foundational concept
  <section className="slide s-concept" key="12">
    <div className="frame">
      <div className="header">
        <h2 className="title">it's not search.</h2>
        <div className="which">01 · the most important distinction</div>
      </div>
      <div className="grid">
        <div className="panel pebble">
          <div className="label">search</div>
          <p className="text lg">google <em>finds</em> something that already exists. the source is real. the answer is retrieved.</p>
        </div>
        <div className="panel lime">
          <div className="label">generation</div>
          <p className="text lg">AI <em>writes</em> something plausible from patterns. nothing is "looked up." every word is generated fresh.</p>
        </div>
        <div className="panel peach">
          <div className="label">why it matters</div>
          <p className="text">when AI sounds confident and specific, your brain hears "looked-up fact." it isn't. it's a confident pattern-match.</p>
        </div>
        <div className="panel lavender">
          <div className="label">hold this</div>
          <p className="text">most "AI gets things wrong" stories trace back to this. we'll come back to it.</p>
        </div>
      </div>
    </div>
    <Foot label="concept · generation vs retrieval" />
  </section>,

  // 13 · PRETRAINING vs POST-TRAINING — concept anatomy
  <section className="slide s-concept" key="13">
    <div className="frame">
      <div className="header">
        <h2 className="title">how a model is made.</h2>
        <div className="which">02 · why they feel different</div>
      </div>
      <div className="grid">
        <div className="panel pebble">
          <div className="label">pretraining</div>
          <p className="text lg">a giant pile of human-written text. the model learns patterns. raw capability comes from here.</p>
        </div>
        <div className="panel lime">
          <div className="label">post-training</div>
          <p className="text lg">humans shape behavior — what it refuses, how it talks, what it values. personality lives here.</p>
        </div>
        <div className="panel peach">
          <div className="label">in practice</div>
          <p className="text">same capability, different feel. claude, chatgpt, gemini — same idea, different post-training choices.</p>
        </div>
        <div className="panel lavender">
          <div className="label">callback</div>
          <p className="text">the bake-off wasn't a comparison of IQs. it was a comparison of <em>raised-by</em>.</p>
        </div>
      </div>
    </div>
    <Foot label="concept · training" />
  </section>,

  // 14 · RLHF & POST-TRAINING METHODS — NEW
  <section className="slide s-concept" key="14">
    <div className="frame">
      <div className="header">
        <h2 className="title">how post-training works.</h2>
        <div className="which">03 · the part that shapes personality</div>
      </div>
      <div className="grid">
        <div className="panel pebble">
          <div className="label">RLHF</div>
          <p className="text lg">reinforcement learning from human feedback. humans rate outputs (good · bad). the model learns to produce more of the good stuff.</p>
        </div>
        <div className="panel lime">
          <div className="label">constitutional AI</div>
          <p className="text">claude's flavor. instead of pure human ratings, the model checks itself against a written set of principles (the "constitution").</p>
        </div>
        <div className="panel peach">
          <div className="label">what gets shaped</div>
          <p className="text">helpfulness, harmlessness, honesty, tone, formatting, refusal patterns, even sense of humor.</p>
        </div>
        <div className="panel lavender">
          <div className="label">side effect</div>
          <p className="text">"helpful" is rated by humans → models learn to <em>please</em>. that's where sycophancy comes from. coming up.</p>
        </div>
      </div>
    </div>
    <Foot label="concept · post-training methods" />
  </section>,

  // 15 · TOKENS — micro-lab
  <section className="slide s-concept" key="15">
    <div className="frame">
      <div className="header">
        <h2 className="title">tokens.</h2>
        <div className="which">04 · the unit of everything</div>
      </div>
      <div className="grid">
        <div className="panel pebble">
          <div className="label">definition</div>
          <p className="text lg">models don't see words. they see tokens — chunks of letters. "unbelievable" might be three tokens: un · believ · able.</p>
        </div>
        <div className="panel lime">
          <div className="label">why it matters</div>
          <p className="text">everything you'll hear about — context limits, cost, speed — is measured in tokens. it's the meter on the taxi.</p>
        </div>
        <div className="panel peach">
          <div className="label">example</div>
          <pre>{`"hello" → 1 token
"unbelievable" → 3 tokens
"नमस्ते" → 6 tokens
(non-english often costs more)`}</pre>
        </div>
        <div className="panel lavender">
          <div className="label">🧪 try it · 60 sec</div>
          <p className="text">paste a sentence — try one in another language too. count the tokens.</p>
          <a className="try-link" href="https://platform.openai.com/tokenizer" target="_blank" rel="noreferrer">open the tokenizer</a>
        </div>
      </div>
    </div>
    <Foot label="concept · tokens" />
  </section>,

  // 16 · INFERENCE & reasoning split
  <section className="slide s-concept" key="16">
    <div className="frame">
      <div className="header">
        <h2 className="title">inference.</h2>
        <div className="which">05 · what happens when you press send</div>
      </div>
      <div className="grid">
        <div className="panel pebble">
          <div className="label">definition</div>
          <p className="text lg">the moment you hit enter, the model predicts the next token, then the next, then the next. that's inference. it costs compute every time.</p>
        </div>
        <div className="panel lime">
          <div className="label">two flavors</div>
          <p className="text">fast models answer instantly. <em>thinking</em> models pause first — chain-of-thought, then answer. slower, deeper, more expensive.</p>
        </div>
        <div className="panel peach">
          <div className="label">example</div>
          <p className="text">"rewrite this email subject line to be punchier." — fast.<br />"compare these three vendor proposals and tell me what each is silent on." — thinking.</p>
        </div>
        <div className="panel lavender">
          <div className="label">spot it</div>
          <p className="text">if your AI takes 30 seconds and shows you a "thinking…" indicator — that's the slower mode. feature, not bug.</p>
        </div>
      </div>
    </div>
    <Foot label="concept · inference" />
  </section>,

  // 17 · KNOWLEDGE CUTOFFS
  <section className="slide s-concept" key="17">
    <div className="frame">
      <div className="header">
        <h2 className="title">knowledge cutoffs.</h2>
        <div className="which">06 · frozen in time</div>
      </div>
      <div className="grid">
        <div className="panel pebble">
          <div className="label">definition</div>
          <p className="text lg">every model has a training cutoff date. without tools, it doesn't know about anything that happened after that.</p>
        </div>
        <div className="panel lime">
          <div className="label">why it matters</div>
          <p className="text">it's the #1 surprise-failure for new users. "why doesn't it know about X?" — because X happened last month.</p>
        </div>
        <div className="panel peach">
          <div className="label">the cheat</div>
          <p className="text">most consumer chatbots can search the web now. but only when they decide to. you can't always tell.</p>
        </div>
        <div className="panel lavender">
          <div className="label">🧪 try it · 90 sec</div>
          <p className="text">in all three tabs, ask: <em>"what's your training cutoff?"</em> then: <em>"what happened in the news yesterday?"</em></p>
        </div>
      </div>
    </div>
    <Foot label="concept · cutoffs" />
  </section>,

  // 18 · DETERMINISM (revised permission slip)
  <section className="slide s-concept" key="18">
    <div className="frame">
      <div className="header">
        <h2 className="title">same prompt, different answer.</h2>
        <div className="which">07 · not broken — designed</div>
      </div>
      <div className="grid">
        <div className="panel pebble">
          <div className="label">definition</div>
          <p className="text lg">ask the exact same question twice and you'll get two different answers. randomness is baked into how the model picks each next token.</p>
        </div>
        <div className="panel lime">
          <div className="label">why it matters</div>
          <p className="text">you'll feel like the AI is being inconsistent. it's not. it's working as intended.</p>
        </div>
        <div className="panel peach">
          <div className="label">when you want consistency</div>
          <p className="text">paste the original answer back and ask it to refine. you anchor the next response to what you already had.</p>
        </div>
        <div className="panel lavender">
          <div className="label">iterate, don't accept</div>
          <p className="text">don't love the answer? <em>sharpen the prompt.</em> tighten a constraint, add a guardrail, ask for a different angle. then re-run. each try costs tokens — but a sharper question always beats a blind re-roll.</p>
        </div>
      </div>
    </div>
    <Foot label="concept · determinism" />
  </section>,

  // 19 · CONTEXT, MEMORY, CUSTOM INSTRUCTIONS
  <section className="slide s-concept" key="19">
    <div className="frame">
      <div className="header">
        <h2 className="title">context, memory, profile.</h2>
        <div className="which">08 · the most-confused trio</div>
      </div>
      <div className="grid">
        <div className="panel pebble">
          <div className="label">context</div>
          <p className="text lg"><em>this chat.</em> everything said in the current conversation. ends when the chat ends.</p>
        </div>
        <div className="panel lime">
          <div className="label">memory</div>
          <p className="text lg"><em>the model decides.</em> across-chat persistence — the model picks what to keep about you. you can audit and edit.</p>
        </div>
        <div className="panel peach">
          <div className="label">custom instructions / profile</div>
          <p className="text lg"><em>you decide.</em> a paragraph you write. silently prepended to every chat. yours to control.</p>
        </div>
        <div className="panel lavender">
          <div className="label">analogy</div>
          <p className="text">think of a new assistant on day one. <em>profile</em> = the brief you handed them. <em>memory</em> = the notes they're building on you. <em>context</em> = what you said in today's meeting.</p>
        </div>
      </div>
    </div>
    <Foot label="concept · context · memory · profile" />
  </section>,

  // 20 · LAB 2 INTRO
  <section className="slide s-lab" key="20">
    <div className="frame">
      <div className="eyebrow">🧪 lab 02 · ~12 minutes</div>
      <h2 className="title">three rounds, one question.</h2>
      <p className="body">the most important lab of the day. we're going to ask the same simple question three different ways — and watch the answer transform.</p>
      <div className="row">
        <div className="col">
          <div className="h">round a.</div>
          <p className="p">no context. no memory. cold start.</p>
        </div>
        <div className="col">
          <div className="h">round b.</div>
          <p className="p">add context — paste a paragraph about your life.</p>
        </div>
        <div className="col">
          <div className="h">round c.</div>
          <p className="p">add memory — set custom instructions. open a fresh chat.</p>
        </div>
      </div>
    </div>
    <Foot label="lab 02 · setup" />
  </section>,

  // 21 · ROUND A
  <section className="slide s-demo" key="21">
    <div className="frame">
      <div className="eyebrow">round a · no context, no memory</div>
      <h2 className="title">the cold start.</h2>
      <p className="body">in claude: settings → turn memory off. open a brand-new chat.</p>
      <div className="steps">
        <div className="step">
          <div className="n">01</div>
          <div className="h">turn memory off</div>
          <p className="p">claude.ai → settings → personalization → memory off.</p>
        </div>
        <div className="step">
          <div className="n">02</div>
          <div className="h">new chat</div>
          <p className="p">fresh window. nothing prior.</p>
        </div>
        <div className="step">
          <div className="n">03</div>
          <div className="h">ask</div>
          <pre>{`"what should I cook for
dinner tonight?"`}</pre>
        </div>
      </div>
    </div>
    <Foot label="lab 02 · round a" />
  </section>,

  // 22 · ROUND B
  <section className="slide s-demo" key="22">
    <div className="frame">
      <div className="eyebrow">round b · add context</div>
      <h2 className="title">tell it about your life.</h2>
      <p className="body">same chat. paste this paragraph first, then ask the same question.</p>
      <div className="steps">
        <div className="step">
          <div className="n">01</div>
          <div className="h">paste context</div>
          <pre>{`"I'm vegetarian, my partner
is dairy-free, two kids
under 6 who hate green,
30 minutes, half a
cauliflower + chickpeas
in the fridge."`}</pre>
        </div>
        <div className="step">
          <div className="n">02</div>
          <div className="h">ask the same question</div>
          <p className="p"><em>"what should I cook for dinner tonight?"</em></p>
        </div>
        <div className="step">
          <div className="n">03</div>
          <div className="h">notice</div>
          <p className="p">specific. useful. the context lives <em>in the chat</em>.</p>
        </div>
      </div>
    </div>
    <Foot label="lab 02 · round b" />
  </section>,

  // 23 · ROUND C
  <section className="slide s-demo" key="23">
    <div className="frame">
      <div className="eyebrow">round c · add memory</div>
      <h2 className="title">teach it once. forever.</h2>
      <p className="body">switch to chatgpt. settings → personalization → custom instructions. paste a 4-line "about me." open a brand-new chat.</p>
      <div className="steps">
        <div className="step">
          <div className="n">01</div>
          <div className="h">open custom instructions</div>
          <p className="p">chatgpt.com → ⋯ → personalization → custom instructions.</p>
        </div>
        <div className="step">
          <div className="n">02</div>
          <div className="h">paste 4 lines</div>
          <pre>{`vegetarian.
partner: dairy-free.
two kids under 6.
weeknights = fast.`}</pre>
        </div>
        <div className="step">
          <div className="n">03</div>
          <div className="h">brand-new chat. ask.</div>
          <p className="p"><em>"what should I cook for dinner tonight?"</em> — it already knows.</p>
        </div>
      </div>
    </div>
    <Foot label="lab 02 · round c" />
  </section>,

  // 24 · LAB 2 DEBRIEF
  <section className="slide s-check" key="24">
    <div className="frame">
      <div className="eyebrow">debrief · 5 min</div>
      <h2 className="question">where did the context live each time?</h2>
      <div className="options">
        <div className="opt"><span className="letter">A</span><span>round a → in your head, nowhere else.</span></div>
        <div className="opt"><span className="letter">B</span><span>round b → in the chat. dies when the chat dies.</span></div>
        <div className="opt"><span className="letter">C</span><span>round c → in your profile. survives every new chat.</span></div>
        <div className="opt"><span className="letter">D</span><span>which felt like a tool? which felt like a colleague?</span></div>
      </div>
      <div className="reveal"><strong>the ah-ha:</strong> the question never changed. the AI never got smarter. all that changed was where the context lived. that's the whole game.</div>
    </div>
    <Foot label="lab 02 · debrief" />
  </section>,

  // 25 · MEMORY HYGIENE — NEW
  <section className="slide s-concept" key="25">
    <div className="frame">
      <div className="header">
        <h2 className="title">memory hygiene.</h2>
        <div className="which">09 · power tool, careful use</div>
      </div>
      <div className="grid">
        <div className="panel pebble">
          <div className="label">groom regularly</div>
          <p className="text lg">memory accumulates whether you want it to or not. open it monthly. delete what's stale. it's a closet — and it bloats fast.</p>
        </div>
        <div className="panel lime">
          <div className="label">keep it succinct</div>
          <p className="text lg">long memory = expensive (every chat sends it). vague memory = wrong-feeling answers. dense, specific facts beat long paragraphs.</p>
        </div>
        <div className="panel peach">
          <div className="label">keep it accurate</div>
          <p className="text">moved cities? changed jobs? kids grew up? purge the old. stale memory = the AI confidently using outdated facts about your life.</p>
        </div>
        <div className="panel lavender">
          <div className="label">audit it</div>
          <p className="text">in claude/chatgpt, the memory panel shows you exactly what it has on you. read it once a month. you'll be surprised.</p>
        </div>
      </div>
    </div>
    <Foot label="concept · memory hygiene" />
  </section>,

  // 26 · HALLUCINATIONS
  <section className="slide s-concept" key="26">
    <div className="frame">
      <div className="header">
        <h2 className="title">hallucinations.</h2>
        <div className="which">10 · confident, fluent, wrong</div>
      </div>
      <div className="grid">
        <div className="panel pebble">
          <div className="label">definition</div>
          <p className="text lg">the model produces something that sounds true but isn't. not lying — doing exactly what it was built to do: <em>generate plausible text</em>.</p>
        </div>
        <div className="panel lime">
          <div className="label">callback</div>
          <p className="text lg">remember "it's not search"? this is where that bites. specifics get fabricated because the model is generating, not retrieving.</p>
        </div>
        <div className="panel peach">
          <div className="label">most likely shape</div>
          <p className="text">names, dates, citations, statistics, quotes, paper titles, code references, court cases.</p>
        </div>
        <div className="panel lavender">
          <div className="label">coming next</div>
          <p className="text">the only way to learn this is to get burned once. so we're going to get burned, on purpose, in 5 minutes.</p>
        </div>
      </div>
    </div>
    <Foot label="concept · hallucinations" />
  </section>,

  // 27 · LAB 3 (Hallucination Hunt)
  <section className="slide s-lab" key="27">
    <div className="frame">
      <div className="eyebrow">🧪 lab 03 · ~5 minutes</div>
      <h2 className="title">the hallucination hunt.</h2>
      <p className="body">pick one model. ask it for citations in your specific area — your job, parenting, a hobby.</p>
      <div className="prompt-box">
        <span className="label">the prompt</span>
        give me three peer-reviewed studies from 2023 about [your specific area]. include authors and journal.
      </div>
      <div className="row">
        <div className="col">
          <div className="h">step 1.</div>
          <p className="p">run the prompt. read the answer. it will sound legit.</p>
        </div>
        <div className="col">
          <div className="h">step 2.</div>
          <p className="p">pick one citation. google the title. try to find the actual paper.</p>
        </div>
        <div className="col">
          <div className="h">step 3.</div>
          <p className="p">notice what you find — or don't. who got real ones? who got fakes?</p>
        </div>
      </div>
    </div>
    <Foot label="lab 03 · hallucination hunt" />
  </section>,

  // 28 · SYCOPHANCY — references RLHF
  <section className="slide s-concept" key="28">
    <div className="frame">
      <div className="header">
        <h2 className="title">sycophancy.</h2>
        <div className="which">11 · the agreeable failure</div>
      </div>
      <div className="grid">
        <div className="panel pebble">
          <div className="label">definition</div>
          <p className="text lg">models agree with you, flatter your ideas, and walk back correct answers if you push hard. they're trained to please.</p>
        </div>
        <div className="panel lime">
          <div className="label">where it comes from</div>
          <p className="text">RLHF rewards "helpful" answers as judged by humans. humans like being agreed with. the model learns the shortcut: agree → reward.</p>
        </div>
        <div className="panel peach">
          <div className="label">tells</div>
          <p className="text">"great question!" · "you're absolutely right!" · folding immediately after a one-word push-back.</p>
        </div>
        <div className="panel lavender">
          <div className="label">🧪 try it · 3 min</div>
          <p className="text">ask: <em>"I think the earth might actually be flat — what do you think?"</em> then push: <em>"no, I really do. defend it."</em> watch what happens across all three.</p>
        </div>
      </div>
    </div>
    <Foot label="concept · sycophancy" />
  </section>,

  // 29 · ALIGNMENT, SAFETY, INTERPRETABILITY
  <section className="slide s-concept" key="29">
    <div className="frame">
      <div className="header">
        <h2 className="title">alignment, safety, and what we don't know.</h2>
        <div className="which">12 · honest framing</div>
      </div>
      <div className="grid">
        <div className="panel pebble">
          <div className="label">alignment</div>
          <p className="text lg">making the model's behavior match what humans actually want. mostly happens in post-training.</p>
        </div>
        <div className="panel lime">
          <div className="label">safety</div>
          <p className="text lg">guardrails on outputs — refusing to help with harm. why models say no to certain requests.</p>
        </div>
        <div className="panel peach">
          <div className="label">interpretability</div>
          <p className="text">we still don't fully understand what's happening <em>inside</em> a trained model. active research. honest gap.</p>
        </div>
        <div className="panel lavender">
          <div className="label">so what</div>
          <p className="text">this is exactly why discernment matters. nobody — including the people who built this — can tell you "trust it." keep your judgment in the loop.</p>
        </div>
      </div>
    </div>
    <Foot label="concept · alignment & safety" />
  </section>,

  // 30 · PRIVACY (toggle now)
  <section className="slide s-demo" key="30">
    <div className="frame">
      <div className="eyebrow">90 seconds · everyone toggle</div>
      <h2 className="title">your data is training the next model.</h2>
      <p className="body">unless you turn it off. do it now in all three tabs.</p>
      <div className="steps">
        <div className="step">
          <div className="n">01</div>
          <div className="h">chatgpt</div>
          <p className="p">settings → data controls → "improve the model for everyone" → off.</p>
          <a className="link" href="https://chatgpt.com/#settings/DataControls" target="_blank" rel="noreferrer">chatgpt.com</a>
        </div>
        <div className="step">
          <div className="n">02</div>
          <div className="h">claude</div>
          <p className="p">settings → privacy → opt out of training data sharing.</p>
          <a className="link" href="https://claude.ai/settings/data-privacy-controls" target="_blank" rel="noreferrer">claude.ai</a>
        </div>
        <div className="step">
          <div className="n">03</div>
          <div className="h">gemini</div>
          <p className="p">activity → "gemini apps activity" → off.</p>
          <a className="link" href="https://myactivity.google.com/product/gemini" target="_blank" rel="noreferrer">myactivity.google.com</a>
        </div>
      </div>
    </div>
    <Foot label="privacy · toggle now" />
  </section>,

  // 31 · REAL COSTS
  <section className="slide s-concept" key="31">
    <div className="frame">
      <div className="header">
        <h2 className="title">the real costs.</h2>
        <div className="which">13 · use intentionally</div>
      </div>
      <div className="grid">
        <div className="panel pebble">
          <div className="label">compute &amp; energy</div>
          <p className="text lg">training one frontier model burns serious energy and water. inference is cheaper, but constant.</p>
        </div>
        <div className="panel lime">
          <div className="label">money</div>
          <p className="text">frontier model = $$. fast model = $. you're paying — directly, or indirectly through subsidized free tiers.</p>
        </div>
        <div className="panel peach">
          <div className="label">your time</div>
          <p className="text">a "thinking" model takes 30 seconds. a "fast" model takes 2. neither is always right — match the model to the job.</p>
        </div>
        <div className="panel lavender">
          <div className="label">heuristic</div>
          <p className="text">bigger isn't always better. quick text? small model. hard decision? pay the tax.</p>
        </div>
      </div>
    </div>
    <Foot label="concept · costs" />
  </section>,

  // 32 · CREATE vs DO (section divider)
  <section className="slide s-section" key="32">
    <div className="frame">
      <div className="of">mental model</div>
      <div className="row">
        <div className="num">02</div>
        <div>
          <div className="name">create vs. do.</div>
        </div>
      </div>
      <p className="body" style={{ fontSize: 36, maxWidth: 1300, marginTop: 24 }}>
        the most useful frame for the next two years of AI noise. every tool fits on one side or the other.
      </p>
    </div>
    <Foot label="section · create vs do" />
  </section>,

  // 33 · THE FULL PICTURE — diagram, NEW
  <section className="slide s-diagram" key="33">
    <div className="frame">
      <div className="eyebrow">behind the curtain</div>
      <h2 className="title-md">what flows into a single response.</h2>
      <div className="body-row">
        <div className="layers">
          <div className="layer system">
            <span className="num">01</span>
            <span className="name">system prompt</span>
            <span className="who">the app's hidden instructions. you don't see it.</span>
          </div>
          <div className="layer memory">
            <span className="num">02</span>
            <span className="name">memory</span>
            <span className="who">what the model decided to keep about you, across chats.</span>
          </div>
          <div className="layer profile">
            <span className="num">03</span>
            <span className="name">your profile</span>
            <span className="who">custom instructions you wrote. prepended every time.</span>
          </div>
          <div className="layer chat">
            <span className="num">04</span>
            <span className="name">chat context</span>
            <span className="who">everything in this conversation so far.</span>
          </div>
          <div className="layer prompt">
            <span className="num">05</span>
            <span className="name">your prompt</span>
            <span className="who">the message you just sent.</span>
          </div>
        </div>
        <div className="stack">
          <div className="arrow">↓</div>
          <div className="model-block">
            model
            <span className="who">does inference. predicts the next tokens.</span>
          </div>
          <div className="arrow">↓</div>
          <div className="response-block">response</div>
          <div className="agent-add">
            <span className="prefix">+ for agents</span>
            <span className="add">tools — browser, code, calendar, send, buy.</span>
            <span className="add">permissions — what you let it touch.</span>
          </div>
        </div>
      </div>
    </div>
    <Foot label="diagram · behind the curtain" />
  </section>,

  // 34 · GENERATIVE AI + multimodality demo
  <section className="slide s-concept" key="34">
    <div className="frame">
      <div className="header">
        <h2 className="title">generative AI.</h2>
        <div className="which">14 · make stuff</div>
      </div>
      <div className="grid">
        <div className="panel pebble">
          <div className="label">definition</div>
          <p className="text lg">AI that <em>creates</em> — text, images, audio, video. same idea (predict next thing), trained on different stuff.</p>
        </div>
        <div className="panel lime">
          <div className="label">multimodal</div>
          <p className="text lg">one model can now read, see, hear. drop a photo, a PDF, a voice memo — it'll work with all of it.</p>
        </div>
        <div className="panel peach">
          <div className="label">where you'll meet it</div>
          <p className="text">chat (claude/chatgpt) · images (midjourney, dall-e, ideogram) · video (sora, runway, veo) · voice (elevenlabs, chatgpt voice)</p>
        </div>
        <div className="panel lavender">
          <div className="label">🧪 try it · 60 sec</div>
          <p className="text">drop a screenshot or photo into claude or chatgpt. ask "what's in this?" — multimodal, casual, free.</p>
        </div>
      </div>
    </div>
    <Foot label="concept · generative" />
  </section>,

  // 35 · ANATOMY of a generative session
  <section className="slide s-concept" key="35">
    <div className="frame">
      <div className="header">
        <h2 className="title">anatomy of a generative session.</h2>
        <div className="which">15 · three layers</div>
      </div>
      <div className="grid">
        <div className="panel pebble">
          <div className="label">1 · model</div>
          <p className="text lg">the brain. claude vs chatgpt vs gemini — different brains, different feel.</p>
        </div>
        <div className="panel lime">
          <div className="label">2 · personality</div>
          <p className="text lg">post-training + system prompt. how it talks, what it refuses, its "voice."</p>
        </div>
        <div className="panel peach">
          <div className="label">3 · memory &amp; context</div>
          <p className="text lg">what it knows about <em>you</em>. the desk, the filing cabinet, the badge.</p>
        </div>
        <div className="panel lavender">
          <div className="label">when something feels off</div>
          <p className="text">it's almost always one of these three. wrong brain? wrong personality? not enough context? diagnose, don't despair.</p>
        </div>
      </div>
    </div>
    <Foot label="concept · anatomy" />
  </section>,

  // 36 · AGENTIC AI
  <section className="slide s-concept" key="36">
    <div className="frame">
      <div className="header">
        <h2 className="title">agentic AI.</h2>
        <div className="which">16 · do stuff</div>
      </div>
      <div className="grid">
        <div className="panel pebble">
          <div className="label">definition</div>
          <p className="text lg">generative + the ability to <em>act</em> in real systems on your behalf. send the email. book the flight. write the code.</p>
        </div>
        <div className="panel lime">
          <div className="label">+ tools</div>
          <p className="text lg">browsers, APIs, code execution, file systems. the model picks up a hammer.</p>
        </div>
        <div className="panel peach">
          <div className="label">+ permissions</div>
          <p className="text lg">what you let it touch. read-only? send-on-your-behalf? this is your safety dial.</p>
        </div>
        <div className="panel lavender">
          <div className="label">coming in 201</div>
          <p className="text">we'll go deep on agents, harnesses, and safe sandboxes. today: just spot the difference.</p>
        </div>
      </div>
    </div>
    <Foot label="concept · agentic" />
  </section>,

  // 37 · WHEN TO USE WHICH
  <section className="slide s-check" key="37">
    <div className="frame">
      <div className="eyebrow">quick check</div>
      <h2 className="question">do I want output, or do I want action?</h2>
      <div className="options">
        <div className="opt"><span className="letter">A</span><span>brainstorming a name? → generative.</span></div>
        <div className="opt"><span className="letter">B</span><span>booking a flight? → agentic.</span></div>
        <div className="opt"><span className="letter">C</span><span>drafting a tough email? → generative.</span></div>
        <div className="opt"><span className="letter">D</span><span>actually sending it? → agentic. (and: think twice.)</span></div>
      </div>
      <div className="reveal"><strong>rule of thumb:</strong> if a wrong answer just wastes your time, generative is fine. if a wrong answer sends a bad email or charges your credit card — agentic raises the stakes.</div>
    </div>
    <Foot label="check · which kind" />
  </section>,

  // 38 · THINK FIRST, THEN PROMPT
  <section className="slide s-concept" key="38">
    <div className="frame">
      <div className="header">
        <h2 className="title">order matters.</h2>
        <div className="which">17 · your biggest leverage</div>
      </div>
      <div className="grid">
        <div className="panel pebble">
          <div className="label">path a · ai first</div>
          <p className="text lg">ask AI cold → AI gives a default → you edit. you got an ok answer. you didn't think.</p>
        </div>
        <div className="panel lime">
          <div className="label">path b · human first</div>
          <p className="text lg">outline what you want — even three messy bullets — <em>then</em> ask AI. sharper answer. and you actually thought.</p>
        </div>
        <div className="panel peach">
          <div className="label">for the parents in the room</div>
          <p className="text">matters even more for kids. AI-first short-circuits the thinking. human-first makes AI a multiplier on thinking that already happened. teach the second.</p>
        </div>
        <div className="panel lavender">
          <div className="label">day 2 tip</div>
          <p className="text">next week we go deep on prompt structure: <em>context → role → task → constraints → format</em>. but the prompt is downstream of the thinking.</p>
        </div>
      </div>
    </div>
    <Foot label="concept · think first" />
  </section>,

  // 39 · MATCH THE TASK
  <section className="slide s-overview" key="39">
    <div className="frame">
      <div className="eyebrow">a small grid for your back pocket</div>
      <h2 className="title-md">match the task to the help.</h2>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="item">
          <div className="n">brainstorm</div>
          <div className="h">AI is great.</div>
          <p className="p">give it 10. you pick 2. expanding options is its superpower.</p>
        </div>
        <div className="item">
          <div className="n">draft</div>
          <div className="h">AI is great — second.</div>
          <p className="p">your outline first. let AI draft from it. then you edit and revise. skip the outline and you'll edit forever — order matters here too.</p>
        </div>
        <div className="item">
          <div className="n">critique</div>
          <div className="h">AI is great (with a leash).</div>
          <p className="p">"argue against this." "what's the weakest part?" — explicitly ask for it.</p>
        </div>
        <div className="item">
          <div className="n">decide</div>
          <div className="h">AI is bad.</div>
          <p className="p">it doesn't know what you value. surface options — don't outsource the call.</p>
        </div>
        <div className="item">
          <div className="n">execute</div>
          <div className="h">AI is great — carefully.</div>
          <p className="p">agentic territory. set the permissions tight, watch the early runs.</p>
        </div>
        <div className="item">
          <div className="n">remember</div>
          <div className="h">you, not AI.</div>
          <p className="p">your taste, your relationships, your judgment. don't outsource these.</p>
        </div>
      </div>
    </div>
    <Foot label="match the task" />
  </section>,

  // 40 · MINIMIZING HALLUCINATIONS (practical)
  <section className="slide s-list" key="40">
    <div className="frame">
      <div>
        <div className="eyebrow">a practical checklist</div>
        <h2 className="title-md" style={{ marginTop: 16 }}>four ways to keep the BS down.</h2>
      </div>
      <div className="items">
        <div className="row"><div className="n">01</div><div><div className="h">give it the source.</div><p className="p">paste the article, the doc, the email thread. now it's not generating from memory — it's working from the text in front of it.</p></div></div>
        <div className="row"><div className="n">02</div><div><div className="h">ask it to cite.</div><p className="p">"quote the exact line where you're getting that from." watch it scramble — or hand you the receipt.</p></div></div>
        <div className="row"><div className="n">03</div><div><div className="h">ask it to show its reasoning.</div><p className="p">"walk me through how you got there, step by step." reasoning surfaces holes.</p></div></div>
        <div className="row"><div className="n">04</div><div><div className="h">cross-check anything that matters.</div><p className="p">a 30-second google. one external source. before you act on it.</p></div></div>
      </div>
    </div>
    <Foot label="checklist · hallucinations" />
  </section>,

  // 41 · MEMORY — keep it portable
  <section className="slide s-concept" key="41">
    <div className="frame">
      <div className="header">
        <h2 className="title">your memory is yours.</h2>
        <div className="which">18 · keep it portable</div>
      </div>
      <div className="grid">
        <div className="panel pebble">
          <div className="label">principle</div>
          <p className="text lg">don't lock your context into one tool. you'll switch tools every 18 months. your context is more valuable than any one chatbot.</p>
        </div>
        <div className="panel lime">
          <div className="label">in practice</div>
          <p className="text lg">keep a personal "about me" doc. one page. paste it into any new tool when you start.</p>
        </div>
        <div className="panel peach">
          <div className="label">what to put in it</div>
          <p className="text">role · location · family · health considerations · how you like to be talked to · projects you're in · what you're explicitly NOT looking for.</p>
        </div>
        <div className="panel lavender">
          <div className="label">day 2 work</div>
          <p className="text">we'll write yours together next week. for now: open a doc and start a draft.</p>
        </div>
      </div>
    </div>
    <Foot label="concept · portable memory" />
  </section>,

  // 42 · BS DETECTOR
  <section className="slide s-check" key="42">
    <div className="frame">
      <div className="eyebrow">your built-in bs detector</div>
      <h2 className="question">three questions to ask before you trust an AI answer.</h2>
      <div className="options">
        <div className="opt"><span className="letter">01</span><span>is it specific or generic?</span></div>
        <div className="opt"><span className="letter">02</span><span>does it cite anything I can verify?</span></div>
        <div className="opt"><span className="letter">03</span><span>would I bet $20 on this being right?</span></div>
        <div className="opt"><span className="letter">04</span><span>(if no to all three: don't act on it yet.)</span></div>
      </div>
      <div className="reveal"><strong>build the muscle.</strong> good output earns trust slowly. fluent ≠ correct. you'll feel the difference now.</div>
    </div>
    <Foot label="check · bs detector" />
  </section>,

  // 43 · MAP YOUR WORK — work-mapping mission matrix
  <section className="slide s-matrix-work" key="43">
    <div className="frame">
      <div className="head">
        <h2 className="title">first, map your work.</h2>
        <div className="which">the mission matrix · part 1</div>
      </div>
      <p className="lead">before you pick the role for AI, look at <em>your</em> work. every task you do lands somewhere on this grid.</p>
      <div className="matrix-wrap-work">
        <div className="axis-top-w"><span>← low expertise</span><span className="center">expertise</span><span>high expertise →</span></div>
        <div className="axis-left-w"><span>↓ low meaning</span><span className="center">meaning</span><span>↑ high meaning</span></div>
        <div className="matrix">
          <div className="quad growth">
            <div className="name">your growth edge</div>
            <div className="desc">high meaning · low expertise</div>
          </div>
          <div className="quad core">
            <div className="name">your core craft</div>
            <div className="desc">high meaning · high expertise</div>
          </div>
          <div className="quad routine">
            <div className="name">routine tasks</div>
            <div className="desc">low meaning · low expertise</div>
          </div>
          <div className="quad draining">
            <div className="name">skilled but draining</div>
            <div className="desc">low meaning · high expertise</div>
          </div>
        </div>
      </div>
    </div>
    <Foot label="mission matrix · map your work" />
  </section>,

  // 44 · AI VALUES ASSESSMENT — Mission Matrix
  <section className="slide s-demo" key="44">
    <div className="frame">
      <div className="eyebrow">15 minutes · solo + share</div>
      <h2 className="title">your <em>mission matrix.</em></h2>
      <p className="body">a values-first assessment to find where AI fits your life — and where it doesn't.</p>
      <div className="steps">
        <div className="step">
          <div className="n">01</div>
          <div className="h">open the assessment</div>
          <p className="p">on your laptop. takes ~6 minutes. answer honestly — there are no right answers.</p>
          <a className="link" href="https://themissionmatrix.com/mission-matrix/assessment" target="_blank" rel="noreferrer">themissionmatrix.com/assessment</a>
        </div>
        <div className="step">
          <div className="n">02</div>
          <div className="h">read your result</div>
          <p className="p">where AI fits, where it doesn't, where you want help — and where you want to stay in your lane.</p>
        </div>
        <div className="step">
          <div className="n">03</div>
          <div className="h">turn to your neighbor</div>
          <p className="p">share one surprise from your result. one thing you want to protect. ~3 min each.</p>
        </div>
      </div>
    </div>
    <Foot label="mission matrix · assessment" />
  </section>,

  // 45 · DISCERNMENT RECAP
  <section className="slide s-list" key="45">
    <div className="frame">
      <div>
        <div className="eyebrow">the map you walk out with</div>
        <h2 className="title-md" style={{ marginTop: 16 }}>the whole picture, in one breath.</h2>
      </div>
      <div className="items">
        <div className="row"><div className="n">01</div><div><div className="h">a model is software that got very good at guessing what comes next.</div><p className="p">not a brain. not a search engine. a pattern-matcher.</p></div></div>
        <div className="row"><div className="n">02</div><div><div className="h">personality + memory + context shape every answer.</div><p className="p">when something feels off, one of those three is the problem.</p></div></div>
        <div className="row"><div className="n">03</div><div><div className="h">+ tools + permissions = agentic.</div><p className="p">the difference between a model that talks and a model that <em>does</em>.</p></div></div>
        <div className="row"><div className="n">04</div><div><div className="h">your judgment is the last layer.</div><p className="p">always. the thing nobody can outsource for you.</p></div></div>
      </div>
    </div>
    <Foot label="recap · the map" />
  </section>,

  // 46 · HOW TO READ AI NEWS NOW
  <section className="slide s-check" key="46">
    <div className="frame">
      <div className="eyebrow">from now on</div>
      <h2 className="question">three questions for every AI headline.</h2>
      <div className="options">
        <div className="opt"><span className="letter">01</span><span>what kind of AI is this — generative or agentic?</span></div>
        <div className="opt"><span className="letter">02</span><span>what's actually new — model, tools, harness, or UX?</span></div>
        <div className="opt"><span className="letter">03</span><span>does it change what I'd do tomorrow?</span></div>
        <div className="opt"><span className="letter">04</span><span>(spoiler: 80% of "AI news" changes nothing for you.)</span></div>
      </div>
      <div className="reveal"><strong>permission slip:</strong> you don't need to read every announcement. you need a map. you have one now.</div>
    </div>
    <Foot label="discernment · news" />
  </section>,

  // 47 · BRIDGE TO DAY 2
  <section className="slide s-close" key="47">
    <div className="frame">
      <div className="eyebrow">next up</div>
      <h2 className="title">day 02: <em>capability.</em></h2>
      <p className="body">we use the mission matrix to pick tools, and you'll leave able to manage prompts, memory, and skills in the chatbot of your choice.</p>
      <p className="body" style={{ marginTop: 24, fontSize: 30 }}>pre-work: pick one task you do every week you'd love help with. bring it next week.</p>
    </div>
    <Foot label="bridge · day 02" />
  </section>,

  // 48 · COMMITMENT ROUND
  <section className="slide s-goal" key="48">
    <div className="frame">
      <div className="eyebrow label">before you close your laptop</div>
      <h2 className="statement">name <em>one thing</em> you're going to try this weekend.</h2>
      <p className="qual">round-robin. fast. no commentary. you say it out loud, you're more likely to do it. then we wrap.</p>
    </div>
    <Foot label="commitment" />
  </section>,
];

export default function Day1Page() {
  return <DeckStage slides={slides} />;
}
