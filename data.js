const COUNTRY_DATA = {
  India: {
    flag:"🇮🇳", name:"India", system:"Parliamentary Democracy",
    body:"Election Commission of India (ECI)",
    votingAge:18, method:"EVM (Electronic Voting Machine)",
    steps:["Voter Registration (EPIC card)","Nomination of candidates","Campaign period (model code of conduct)","Polling Day","Vote counting & results"],
    funFacts:[
      "India has the world's largest electorate — over 960 million voters! 🌏",
      "India's EVMs were first used nationwide in the 1999 general elections.",
      "India holds elections in multiple phases spread over 4–6 weeks to deploy security forces.",
      "The Election Commission of India is one of the few bodies that can override the government during elections.",
      "In India, indelible ink used on voter fingers lasts about 2 weeks and cannot be washed off.",
      "India's 2024 general election was the largest democratic exercise in human history — 642 million votes cast!"
    ],
    terms:{EVM:"Electronic Voting Machine used in India since 1999",EPIC:"Elector's Photo Identity Card (Voter ID)",Constituency:"A geographic area that elects one representative",LS:"Lok Sabha — Lower house of Parliament",RS:"Rajya Sabha — Upper house of Parliament"},
    eligibility:["Must be 18+ years old","Must be an Indian citizen","Must be registered on the electoral roll","Must not be of unsound mind","Must not be disqualified by law"]
  },
  USA: {
    flag:"🇺🇸", name:"USA", system:"Federal Presidential Republic",
    body:"Federal Election Commission (FEC)",
    votingAge:18, method:"Paper ballot / Electronic voting (varies by state)",
    steps:["Voter Registration","Primary Elections","Party Conventions","General Election Campaign","Election Day","Electoral College Vote","Certification of results"],
    funFacts:[
      "The USA uses an Electoral College — you vote for electors, not directly for the President.",
      "A US Presidential candidate can win the Electoral College while losing the popular vote — it has happened 5 times!",
      "The US has just two major parties, unlike most democracies which have many.",
      "Election Day in the USA is always the first Tuesday after the first Monday in November.",
      "Some US states allow felons who have served their sentence to vote; others ban it permanently.",
      "The 19th Amendment gave women the right to vote in the USA in 1920 — just over 100 years ago!"
    ],
    terms:{Electoral_College:"538 electors who formally elect the President",Primary:"Election to choose a party's candidate",Swing_State:"A state where either party could win",Caucus:"A local meeting where voters choose candidates",Gerrymandering:"Manipulating district boundaries for political advantage"},
    eligibility:["Must be 18+ on Election Day","Must be a US citizen","Must be registered (varies by state)","Cannot be a convicted felon in most states","Must be a resident of the state"]
  },
  UK: {
    flag:"🇬🇧", name:"UK", system:"Constitutional Monarchy / Parliamentary Democracy",
    body:"Electoral Commission",
    votingAge:18, method:"Paper ballot (First Past the Post)",
    steps:["Dissolution of Parliament","Candidate Nominations","Campaign period (~5 weeks)","Polling Day","Counting overnight","PM appointed","King's Speech"],
    funFacts:[
      "UK elections must be held within 25 working days of Parliament being dissolved.",
      "The UK uses paper ballots counted by hand — no electronic voting machines at all!",
      "The Prime Minister is NOT directly elected — the leader of the party with the most seats becomes PM.",
      "UK voters receive a poll card by post but don't need it — ID rules vary by region.",
      "The UK's first-past-the-post system means a party can win a majority of seats with just ~35% of votes.",
      "Candidates in the UK must pay a £500 deposit — they get it back only if they win 5%+ of the vote."
    ],
    terms:{FPTP:"First Past the Post — candidate with most votes wins",MP:"Member of Parliament",Constituency:"One of 650 areas that elects one MP",Manifesto:"A party's written pledge of policies",By_election:"An election held between general elections for one seat"},
    eligibility:["Must be 18+ on polling day","Must be a British, Irish or qualifying Commonwealth citizen","Must be registered to vote","Must be a UK resident","Peers and prisoners are excluded"]
  },
  General: {
    flag:"🌐", name:"General", system:"Democratic Elections Worldwide",
    body:"Electoral Bodies vary by country",
    votingAge:18, method:"Paper ballot / Electronic voting",
    steps:["Voter Registration","Candidate Nomination","Campaigning","Voting Day","Counting","Results Declaration"],
    funFacts:[
      "Over 150 countries hold elections. Democracy is the world's most common form of government.",
      "Australia makes voting compulsory — citizens can be fined for not voting!",
      "Switzerland holds national referendums 3–4 times a year, letting citizens vote directly on laws.",
      "New Zealand was the first country to give women the right to vote, in 1893.",
      "Brazil also has compulsory voting, and voter turnout regularly exceeds 80%.",
      "The word 'ballot' comes from the Italian 'ballotta' meaning 'small ball' — ancient Greeks voted with balls!"
    ],
    terms:{Ballot:"The official paper or screen used to cast a vote",Polling_Station:"The place where you go to vote",Constituency:"An area represented by one elected official",Mandate:"The authority granted by voters to a winning candidate",Abstention:"Choosing not to vote"},
    eligibility:["Age requirement (usually 18)","Citizenship of the country","Voter registration","Mental competency","No legal disqualification"]
  }
};

const LEVELS = [
  {id:0, title:"Intro & Basics", icon:"🏛️", xp:100, badge:"🏛️", badgeName:"Civic Starter",
    description:"What are elections and why do they matter?"},
  {id:1, title:"Voter Registration", icon:"📋", xp:100, badge:"📋", badgeName:"Registered Citizen",
    description:"How to register and prepare to vote"},
  {id:2, title:"Campaigning", icon:"📣", xp:100, badge:"📣", badgeName:"Campaign Pro",
    description:"How candidates compete for your vote"},
  {id:3, title:"Voting Simulation", icon:"🗳️", xp:100, badge:"🗳️", badgeName:"Vote Ready",
    description:"Walk through the real voting experience"},
  {id:4, title:"Counting & Results", icon:"📊", xp:100, badge:"🏆", badgeName:"Democracy Champion",
    description:"How votes are counted and winners declared"}
];

const QUIZZES = [
  // Level 0
  {level:0, q:"What is the main purpose of a democratic election?", opts:["To appoint leaders by birth","To allow citizens to choose their representatives","To let the army decide who governs","To pick randomly from citizens"], ans:1, exp:"Elections allow citizens to vote for who represents them — this is the foundation of democracy."},
  // Level 1
  {level:1, q:"What document does India use as a Voter ID?", opts:["Passport","Aadhaar only","EPIC card (Voter ID)","PAN card"], ans:2, exp:"EPIC stands for Elector's Photo Identity Card — it's the official voter ID issued by the Election Commission of India."},
  // Level 2
  {level:2, q:"What is a 'manifesto' in an election campaign?", opts:["A type of ballot paper","A party's written list of promises and policies","A court order during elections","The name of a polling booth"], ans:1, exp:"A manifesto is a published document where a political party outlines what they promise to do if elected."},
  // Level 3
  {level:3, q:"In India, what replaces traditional ballot boxes today?", opts:["Mobile apps","Postal votes only","EVMs (Electronic Voting Machines)","Biometric scanners"], ans:2, exp:"India switched to EVMs in 1999. They are tamper-resistant electronic devices that record and count votes."},
  // Level 4
  {level:4, q:"What happens if no party wins an outright majority?", opts:["The election is cancelled","The president picks a winner","A hung parliament / coalition is formed","A coin toss decides"], ans:2, exp:"When no single party wins a majority, parties may form a coalition government by joining together to reach the required number of seats."}
];

const CONTENT = {
  0: {
    quick:`🏛️ **Elections in 30 seconds**

An election is how citizens choose their leaders.

**The 5 core steps:**
1. 📋 Register to vote
2. 📣 Candidates campaign
3. 🗳️ Citizens vote
4. 📊 Votes are counted
5. 🏆 Winner is declared & takes office

That's democracy in action!`,

    deep:`🏛️ **What Are Elections?**

An election is a formal process where citizens vote to choose representatives or decide on policies.

**Why elections matter:**
- They give citizens a voice in governance
- They ensure peaceful transfer of power
- They hold leaders accountable
- They reflect the will of the majority while protecting minority rights

**Types of elections:**
- **General Election** – to elect a government
- **By-election** – to fill a single vacant seat
- **Referendum** – to vote on a specific issue
- **Local election** – for city/town representatives

**Key principle:** One person, one vote — every vote counts equally.`,

    interactive:`🏛️ **Welcome to Civic Basics!**

Let's start with a quick scenario:

> 🧠 *Imagine your city needs a new mayor. Nobody is in charge yet. How would you decide who leads?*

Most people say: **"Let everyone vote!"** — That's exactly what an election is.

**Core idea:** Elections = Citizens + Choices + Counting

**3 pillars of a fair election:**
1. 🔒 **Secret ballot** – Nobody knows how you voted
2. ⚖️ **Free & fair** – No cheating or coercion
3. 🌍 **Universal** – Every eligible adult can vote`
  },
  1: {
    quick:`📋 **Voter Registration — Quick Guide**

You must register *before* you can vote.

**What you need (India):**
- Age 18+
- Indian citizen
- EPIC (Voter ID) card
- Address proof

**How:** Fill Form 6 online at voters.eci.gov.in

⏱️ Register at least 30 days before election day!`,

    deep:`📋 **Voter Registration — Deep Dive**

Registration is the gateway to voting. Without it, you cannot cast a ballot.

**Why registration exists:**
- Prevents fraud and duplicate votes
- Creates an official electoral roll
- Helps plan polling infrastructure

**India Registration Steps:**
1. Visit voters.eci.gov.in
2. Click "New Registration" → Fill Form 6
3. Upload: photo, age proof, address proof
4. Submit → Verification by BLO (Booth Level Officer)
5. Get EPIC card (Voter ID) by mail

**USA Registration (varies by state):**
- Online, by mail, or in person at DMV
- Deadline: 15–30 days before election
- Some states allow same-day registration

**UK Registration:**
- Register at gov.uk/register-to-vote
- Need: Name, address, date of birth, National Insurance number
- Deadline: 12 working days before polling`,

    interactive:`📋 **Registration Simulation!**

You just turned 18. It's your first election. Let's register you to vote!

**Choose your action:**

> A) Go to the government website
> B) Visit the local election office
> C) Ask a friend to vote for you

*(Type A, B, or C, or just type "continue")*`
  },
  2: {
    quick:`📣 **Campaigning — Quick Guide**

Campaigning = candidates convincing you to vote for them.

**Campaign tools:**
- 📺 TV/radio ads
- 🗣️ Public rallies & speeches
- 📱 Social media
- 🚪 Door-to-door canvassing
- 📄 Manifestos (promise documents)

**Rules:** Campaigns must follow a Code of Conduct — no hate speech, no bribery.`,

    deep:`📣 **Campaigning — Deep Dive**

Campaigns are how candidates communicate their vision to voters.

**Campaign phases:**
1. **Announcement** – Candidate declares they're running
2. **Fundraising** – Collecting money legally for ads, events
3. **Policy rollout** – Publishing manifesto/platform
4. **Ground campaign** – Rallies, door knocking, meetings
5. **Media campaign** – Ads, debates, interviews
6. **Final push** – Last 48-hour sprint before voting

**Model Code of Conduct (India):**
- No use of religion for votes
- No government schemes announced after code kicks in
- Equal access to public spaces for all parties
- Monitored by the Election Commission

**Campaign finance limits (India):**
- Lok Sabha candidate: ₹95 lakh limit
- Rajya Sabha: ₹40 lakh limit`,

    interactive:`📣 **You're Running for Office!**

You're a candidate. Election day is in 4 weeks.

**What do you do first?**

> A) Start posting on social media
> B) Write your manifesto (policy promises)
> C) Host a rally immediately
> D) Meet with party leaders

*(Type A, B, C, or D — or "continue" for the full guide)*`
  },
  3: {
    quick:`🗳️ **Voting — Quick Guide**

**On election day:**
1. Bring your Voter ID
2. Go to your assigned polling booth
3. Tell the officer your name
4. Get your finger inked (India)
5. Press the button on the EVM
6. Done — your vote is secret!

⏰ Polls usually open 7am–6pm.`,

    deep:`🗳️ **Voting — Deep Dive**

Voting is the most direct act of democracy.

**Before you go:**
- Check your booth: voters.eci.gov.in → "Find Polling Station"
- Carry valid ID (Voter ID, Aadhaar, Passport, etc.)
- Check your name on the electoral roll

**At the polling booth:**
1. Join the queue
2. Verification by polling officer
3. Your name is marked in the register
4. Left index finger is inked (indelible ink — lasts ~2 weeks)
5. You receive a ballot slip
6. Enter the voting compartment
7. Press the button next to your candidate on the EVM
8. A beep confirms your vote
9. VVPAT slip appears for 7 seconds (paper trail)
10. Exit

**Secret ballot:** Nobody can ever know how you voted — it's legally protected.

**VVPAT:** Voter Verifiable Paper Audit Trail — a printed slip showing who you voted for, goes into a sealed box.`,

    interactive:`🗳️ **Voting Booth Simulation!**

*You are at the polling station. It's 9:00 AM.*

An officer checks your ID. Your name is on the list. ✅

**You walk into the voting compartment. You see the EVM.**

The EVM shows:
- 🔵 Party A — Candidate Ravi Kumar
- 🟢 Party B — Candidate Priya Singh
- 🟡 Party C — Candidate Arun Mehta
- ⚪ NOTA (None of the Above)

**What do you press?**

*(Type the name or "NOTA" — your vote is secret and safe!)*`
  },
  4: {
    quick:`📊 **Counting & Results — Quick Guide**

After polls close:

1. EVMs are sealed & transported
2. Counting starts (usually next morning)
3. Votes tallied per constituency
4. Returning Officer declares winner
5. Results announced
6. Winner takes oath of office

In India, full results come within 24 hours!`,

    deep:`📊 **Counting & Results — Deep Dive**

Counting is a carefully monitored process to ensure accuracy.

**Counting day timeline (India):**

| Time | Activity |
|------|----------|
| 8:00 AM | Counting begins |
| 8:30 AM | Early trends on news |
| 12:00 PM | Most seats showing clear leads |
| 4:00 PM | Majority of results declared |
| 6:00 PM | Official final tally |

**How counting works:**
1. EVMs brought to counting center under guard
2. Candidates/agents allowed to observe
3. Each EVM result is read and tallied
4. Votes counted per polling booth
5. Totals aggregated per constituency
6. Returning Officer announces winner
7. Winner signs acceptance & files papers

**What happens next:**
- Winning party/coalition forms government
- Leader is invited to form cabinet
- President/Governor administers oath
- New government begins within 2–3 weeks

**If results are disputed:**
- Candidates can request a recount
- Election courts hear election petitions
- Supreme Court has final jurisdiction`,

    interactive:`📊 **Counting Day Simulation!**

*It's 8:30 AM. Counting has begun. You're watching as an observer.*

**Early trends for your constituency:**
- 🔵 Ravi Kumar: 12,450 votes (42%)
- 🟢 Priya Singh: 14,230 votes (48%)
- 🟡 Arun Mehta: 2,890 votes (10%)

**50,000 votes still to be counted.**

> ❓ Can Ravi Kumar still win?
> ❓ What would a "hung result" mean here?

*(Type your answer or "continue" for the explanation!)*`
  }
};

const TOOLS = {
  checklist: {
    title:"📋 First Vote Checklist",
    content:`
      <h2>📋 First Vote Checklist</h2>
      <h3>Before Election Day</h3>
      <div class="check-item"><span class="check-icon">✅</span><span>Register on the electoral roll (voters.eci.gov.in for India)</span></div>
      <div class="check-item"><span class="check-icon">✅</span><span>Check your name on the voter list</span></div>
      <div class="check-item"><span class="check-icon">✅</span><span>Find your assigned polling booth</span></div>
      <div class="check-item"><span class="check-icon">✅</span><span>Check valid ID documents you need to carry</span></div>
      <div class="check-item"><span class="check-icon">✅</span><span>Research candidates and their manifestos</span></div>
      <div class="check-item"><span class="check-icon">✅</span><span>Note the voting time (usually 7am–6pm)</span></div>
      <h3>On Election Day</h3>
      <div class="check-item"><span class="check-icon">✅</span><span>Carry your Voter ID / EPIC card</span></div>
      <div class="check-item"><span class="check-icon">✅</span><span>Go to YOUR assigned polling station (not any booth)</span></div>
      <div class="check-item"><span class="check-icon">✅</span><span>Stand in queue patiently</span></div>
      <div class="check-item"><span class="check-icon">✅</span><span>Let officer verify your identity</span></div>
      <div class="check-item"><span class="check-icon">✅</span><span>Vote in private — it's your secret right</span></div>
      <div class="check-item"><span class="check-icon">✅</span><span>Check the indelible ink mark on your finger</span></div>
    `
  },
  eligible: {
    title:"✅ Am I Eligible to Vote?",
    content:`
      <h2>✅ Eligibility Checker</h2>
      <h3>🇮🇳 India</h3>
      <ul>
        <li>Age: 18+ years on the qualifying date</li>
        <li>Citizenship: Indian citizen</li>
        <li>Registration: Name on electoral roll</li>
        <li>Residency: Ordinary resident of the constituency</li>
        <li>Not declared of unsound mind by a court</li>
        <li>Not disqualified under any law</li>
      </ul>
      <h3>🇺🇸 USA</h3>
      <ul>
        <li>Age: 18+ by Election Day</li>
        <li>Citizenship: US citizen</li>
        <li>Registration: Varies by state (10–30 days before)</li>
        <li>Not currently serving a felony sentence (varies by state)</li>
      </ul>
      <h3>🇬🇧 UK</h3>
      <ul>
        <li>Age: 18+ on polling day</li>
        <li>Nationality: British, Irish, or qualifying Commonwealth citizen</li>
        <li>Registration: On electoral register</li>
        <li>Not a convicted prisoner currently serving sentence</li>
      </ul>
    `
  },
  compare: {
    title:"🌍 Country Comparison",
    content:`
      <h2>🌍 Election Systems Compared</h2>
      <div class="country-compare-grid">
        <div class="compare-col">
          <h4>🇮🇳 India</h4>
          <p><b>System:</b> Parliamentary</p>
          <p><b>Method:</b> FPTP</p>
          <p><b>Voting:</b> EVM</p>
          <p><b>Body:</b> ECI</p>
          <p><b>Seats:</b> 543 (Lok Sabha)</p>
          <p><b>Term:</b> 5 years</p>
          <p><b>Turnout:</b> ~67%</p>
        </div>
        <div class="compare-col">
          <h4>🇺🇸 USA</h4>
          <p><b>System:</b> Presidential</p>
          <p><b>Method:</b> Electoral College</p>
          <p><b>Voting:</b> Paper/Electronic</p>
          <p><b>Body:</b> FEC</p>
          <p><b>Seats:</b> 538 Electoral votes</p>
          <p><b>Term:</b> 4 years</p>
          <p><b>Turnout:</b> ~55%</p>
        </div>
        <div class="compare-col">
          <h4>🇬🇧 UK</h4>
          <p><b>System:</b> Parliamentary</p>
          <p><b>Method:</b> FPTP</p>
          <p><b>Voting:</b> Paper ballot</p>
          <p><b>Body:</b> Electoral Commission</p>
          <p><b>Seats:</b> 650 (Commons)</p>
          <p><b>Term:</b> 5 years</p>
          <p><b>Turnout:</b> ~67%</p>
        </div>
      </div>
    `
  },
  glossary: {
    title:"📖 Election Glossary",
    content:`
      <h2>📖 Key Election Terms</h2>
      <h3>Universal Terms</h3>
      <ul>
        <li><b>Ballot:</b> The official document used to cast a vote</li>
        <li><b>Constituency:</b> A geographic area that elects one representative</li>
        <li><b>Candidate:</b> A person standing for election</li>
        <li><b>Manifesto:</b> A party's published list of policy promises</li>
        <li><b>Mandate:</b> The authority voters give to a winning party</li>
        <li><b>Polling Station:</b> The place where you go to vote</li>
        <li><b>Returning Officer:</b> Official who manages the election in one area</li>
        <li><b>NOTA:</b> None Of The Above — option to reject all candidates</li>
        <li><b>Hung Parliament:</b> No party wins an overall majority</li>
        <li><b>Coalition:</b> Two or more parties governing together</li>
      </ul>
      <h3>India-Specific</h3>
      <ul>
        <li><b>EVM:</b> Electronic Voting Machine</li>
        <li><b>VVPAT:</b> Voter Verifiable Paper Audit Trail</li>
        <li><b>EPIC:</b> Elector's Photo Identity Card (Voter ID)</li>
        <li><b>BLO:</b> Booth Level Officer — local election official</li>
        <li><b>MCC:</b> Model Code of Conduct — rules during elections</li>
      </ul>
      <h3>USA-Specific</h3>
      <ul>
        <li><b>Electoral College:</b> 538 electors who formally elect the President</li>
        <li><b>Primary:</b> Intra-party vote to pick a candidate</li>
        <li><b>Swing State:</b> State that could vote either party</li>
        <li><b>Gerrymandering:</b> Manipulating district shapes for advantage</li>
      </ul>
    `
  },
  dos: {
    title:"✔️ Do's & Don'ts of Voting",
    content:`
      <h2>✔️ Voting Do's & Don'ts</h2>
      <h3>✅ DO</h3>
      <div class="check-item"><span class="check-icon">✅</span><span>Carry valid photo ID to the polling booth</span></div>
      <div class="check-item"><span class="check-icon">✅</span><span>Check your name on the electoral roll before election day</span></div>
      <div class="check-item"><span class="check-icon">✅</span><span>Vote independently — it's your personal right</span></div>
      <div class="check-item"><span class="check-icon">✅</span><span>Research candidates and their track records</span></div>
      <div class="check-item"><span class="check-icon">✅</span><span>Report any irregularities to election officers</span></div>
      <div class="check-item"><span class="check-icon">✅</span><span>Respect the queue and follow booth rules</span></div>
      <h3>❌ DON'T</h3>
      <div class="check-item"><span class="check-icon">❌</span><span>Don't accept money or gifts for your vote (illegal)</span></div>
      <div class="check-item"><span class="check-icon">❌</span><span>Don't reveal your vote to anyone — it's secret by law</span></div>
      <div class="check-item"><span class="check-icon">❌</span><span>Don't bring campaign materials into the booth</span></div>
      <div class="check-item"><span class="check-icon">❌</span><span>Don't photograph your ballot or the EVM</span></div>
      <div class="check-item"><span class="check-icon">❌</span><span>Don't create disturbance at polling stations</span></div>
      <div class="check-item"><span class="check-icon">❌</span><span>Don't vote more than once</span></div>
    `
  },

  demo2024: {
    title:"🇮🇳 2024 Lok Sabha — Live Demo",
    content:`
      <h2>🇮🇳 2024 Lok Sabha Election — Real Example</h2>
      <p style="color:var(--text2);font-size:.82rem;margin-bottom:16px">World's largest democratic exercise · 642 million votes cast</p>

      <div class="demo-timeline">

        <div class="demo-step">
          <div class="demo-step-head">
            <div class="demo-num">1</div>
            <div class="demo-step-info">
              <div class="demo-step-title">🏛️ Election Announcement</div>
              <div class="demo-step-date">📅 16 March 2024</div>
            </div>
          </div>
          <div class="demo-step-body">
            <p>Election Commission of India announced:</p>
            <ul>
              <li>7-phase election schedule</li>
              <li>Voting dates across India</li>
              <li>Model Code of Conduct (MCC) activated</li>
            </ul>
            <div class="demo-note">👉 Government cannot announce new schemes after MCC starts.</div>
          </div>
        </div>

        <div class="demo-step">
          <div class="demo-step-head">
            <div class="demo-num" style="background:linear-gradient(135deg,#f59e0b,#fb923c)">2</div>
            <div class="demo-step-info">
              <div class="demo-step-title">📋 Updating Voter List</div>
              <div class="demo-step-date">📅 Jan – March 2024</div>
            </div>
          </div>
          <div class="demo-step-body">
            <ul>
              <li>New voters (18+) added to rolls</li>
              <li>Incorrect details corrected</li>
              <li>Duplicate entries removed</li>
            </ul>
            <div class="demo-note">👉 Only registered voters can cast a ballot.</div>
          </div>
        </div>

        <div class="demo-step">
          <div class="demo-step-head">
            <div class="demo-num" style="background:linear-gradient(135deg,#f59e0b,#fb923c)">3</div>
            <div class="demo-step-info">
              <div class="demo-step-title">🧑‍💼 Candidate Nomination</div>
              <div class="demo-step-date">📅 March – April 2024 (phase-wise)</div>
            </div>
          </div>
          <div class="demo-step-body">
            <p>Candidates submitted:</p>
            <ul>
              <li>Personal information & party affiliation</li>
              <li>Criminal records (if any)</li>
              <li>Assets & liabilities declaration</li>
            </ul>
            <div class="demo-note">👉 Ensures full transparency to voters.</div>
          </div>
        </div>

        <div class="demo-step">
          <div class="demo-step-head">
            <div class="demo-num" style="background:linear-gradient(135deg,#f59e0b,#fb923c)">4</div>
            <div class="demo-step-info">
              <div class="demo-step-title">🔍 Scrutiny of Nominations</div>
              <div class="demo-step-date">📅 Few days after nomination deadline</div>
            </div>
          </div>
          <div class="demo-step-body">
            <ul>
              <li>Officials verified documents</li>
              <li>Checked candidate eligibility</li>
            </ul>
            <div class="demo-note">👉 Invalid nominations were rejected.</div>
          </div>
        </div>

        <div class="demo-step">
          <div class="demo-step-head">
            <div class="demo-num" style="background:linear-gradient(135deg,#f59e0b,#fb923c)">5</div>
            <div class="demo-step-info">
              <div class="demo-step-title">↩️ Withdrawal of Candidates</div>
              <div class="demo-step-date">📅 ~2–3 days after scrutiny</div>
            </div>
          </div>
          <div class="demo-step-body">
            <div class="demo-note">👉 Final list of candidates published per constituency.</div>
          </div>
        </div>

        <div class="demo-step">
          <div class="demo-step-head">
            <div class="demo-num" style="background:linear-gradient(135deg,#06b6d4,#0ea5e9)">6</div>
            <div class="demo-step-info">
              <div class="demo-step-title">📢 Election Campaigning</div>
              <div class="demo-step-date">📅 March → May 2024</div>
            </div>
          </div>
          <div class="demo-step-body">
            <p>Activities included:</p>
            <ul>
              <li>Rallies, speeches, TV/digital ads</li>
              <li>Door-to-door campaigns</li>
            </ul>
            <p>Key leaders: <strong>Narendra Modi</strong> (BJP) · <strong>Rahul Gandhi</strong> (INC)</p>
            <div class="demo-note">👉 All activity governed by Model Code of Conduct.</div>
          </div>
        </div>

        <div class="demo-step">
          <div class="demo-step-head">
            <div class="demo-num" style="background:linear-gradient(135deg,#06b6d4,#0ea5e9)">7</div>
            <div class="demo-step-info">
              <div class="demo-step-title">🛑 Campaign Silence Period</div>
              <div class="demo-step-date">📅 48 hrs before each phase</div>
            </div>
          </div>
          <div class="demo-step-body">
            <div class="demo-note">👉 Zero campaigning allowed. Violation = legal action.</div>
          </div>
        </div>

        <div class="demo-step">
          <div class="demo-step-head">
            <div class="demo-num" style="background:linear-gradient(135deg,#10b981,#059669)">8</div>
            <div class="demo-step-info">
              <div class="demo-step-title">🗳️ Voting Day — 7 Phases</div>
              <div class="demo-step-date">📅 April 19 – June 1, 2024</div>
            </div>
          </div>
          <div class="demo-step-body">
            <div class="phase-grid">
              <div class="phase-pill">Phase 1 · 19 Apr</div>
              <div class="phase-pill">Phase 2 · 26 Apr</div>
              <div class="phase-pill">Phase 3 · 7 May</div>
              <div class="phase-pill">Phase 4 · 13 May</div>
              <div class="phase-pill">Phase 5 · 20 May</div>
              <div class="phase-pill">Phase 6 · 25 May</div>
              <div class="phase-pill phase-pill--last">Phase 7 · 1 Jun</div>
            </div>
            <p style="margin-top:8px">Process: ID check → Ink mark → EVM vote → VVPAT verified</p>
          </div>
        </div>

        <div class="demo-step">
          <div class="demo-step-head">
            <div class="demo-num" style="background:linear-gradient(135deg,#10b981,#059669)">9</div>
            <div class="demo-step-info">
              <div class="demo-step-title">🔒 Sealing & Storage of EVMs</div>
              <div class="demo-step-date">📅 After each phase</div>
            </div>
          </div>
          <div class="demo-step-body">
            <div class="demo-note">👉 Stored under 24/7 security. No tampering possible.</div>
          </div>
        </div>

        <div class="demo-step">
          <div class="demo-step-head">
            <div class="demo-num" style="background:linear-gradient(135deg,#8b5cf6,#7c3aed)">10</div>
            <div class="demo-step-info">
              <div class="demo-step-title">📊 Counting of Votes</div>
              <div class="demo-step-date">📅 4 June 2024</div>
            </div>
          </div>
          <div class="demo-step-body">
            <div class="demo-note">👉 EVMs opened, votes tallied constituency-by-constituency.</div>
          </div>
        </div>

        <div class="demo-step">
          <div class="demo-step-head">
            <div class="demo-num" style="background:linear-gradient(135deg,#8b5cf6,#7c3aed)">11</div>
            <div class="demo-step-info">
              <div class="demo-step-title">🏆 Declaration of Results</div>
              <div class="demo-step-date">📅 4 June 2024</div>
            </div>
          </div>
          <div class="demo-step-body">
            <div class="demo-note">👉 Winners declared as MPs (Members of Parliament).</div>
          </div>
        </div>

        <div class="demo-step">
          <div class="demo-step-head">
            <div class="demo-num" style="background:linear-gradient(135deg,#f59e0b,#eab308)">12</div>
            <div class="demo-step-info">
              <div class="demo-step-title">🤝 Government Formation</div>
              <div class="demo-step-date">📅 June 2024</div>
            </div>
          </div>
          <div class="demo-step-body">
            <p>NDA coalition won majority → invited by President <strong>Droupadi Murmu</strong> to form government.</p>
          </div>
        </div>

        <div class="demo-step demo-step--last">
          <div class="demo-step-head">
            <div class="demo-num" style="background:linear-gradient(135deg,#f59e0b,#eab308)">13</div>
            <div class="demo-step-info">
              <div class="demo-step-title">🎖️ Oath Ceremony</div>
              <div class="demo-step-date">📅 9 June 2024</div>
            </div>
          </div>
          <div class="demo-step-body">
            <div class="demo-note">👉 Narendra Modi took oath as PM for a historic 3rd consecutive term.</div>
          </div>
        </div>

      </div>
    `
  },

  indiansystem: {
    title:"🏛️ Indian Political System",
    content:`
      <h2>🏛️ Indian Political System</h2>

      <div class="sys-section">
        <h3>🏛️ Parliament of India</h3>
        <p>Highest law-making body of India. Has two houses:</p>
        <div class="sys-houses">
          <div class="sys-house sys-house--blue">
            <div class="sys-house-title">🏠 Lok Sabha</div>
            <div class="sys-house-sub">Lower House</div>
            <ul>
              <li>Directly elected by citizens</li>
              <li>Total seats: <strong>543</strong></li>
              <li>Term: 5 years</li>
            </ul>
            <div class="sys-role-tag">Roles</div>
            <ul>
              <li>Makes laws</li>
              <li>Controls government</li>
              <li>Decides Prime Minister</li>
            </ul>
          </div>
          <div class="sys-house sys-house--purple">
            <div class="sys-house-title">🏛️ Rajya Sabha</div>
            <div class="sys-house-sub">Upper House</div>
            <ul>
              <li>Members elected by MLAs</li>
              <li>Total seats: <strong>245</strong></li>
              <li>Permanent (no dissolution)</li>
            </ul>
            <div class="sys-role-tag">Roles</div>
            <ul>
              <li>Reviews & refines laws</li>
              <li>Represents state interests</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="sys-section">
        <h3>👥 Key Elected Roles</h3>
        <div class="sys-role-card">
          <div class="sys-role-icon">👨‍💼</div>
          <div>
            <div class="sys-role-title">MP — Member of Parliament</div>
            <div class="sys-role-desc">Elected to Lok Sabha or Rajya Sabha. Makes national laws, discusses issues, represents people.</div>
          </div>
        </div>
        <div class="sys-role-card">
          <div class="sys-role-icon">🧑‍💼</div>
          <div>
            <div class="sys-role-title">MLA — Member of Legislative Assembly</div>
            <div class="sys-role-desc">Elected in state elections. Makes state laws, votes to choose Chief Minister.</div>
          </div>
        </div>
        <div class="sys-role-card">
          <div class="sys-role-icon">🏙️</div>
          <div>
            <div class="sys-role-title">Mayor</div>
            <div class="sys-role-desc">Head of a city's Municipal Corporation. Handles roads, water, cleanliness & urban development.</div>
          </div>
        </div>
      </div>

      <div class="sys-section">
        <h3>👑 Key Leader Roles</h3>
        <div class="sys-leader-grid">
          <div class="sys-leader-card">
            <div class="sys-leader-emoji">🇮🇳</div>
            <div class="sys-leader-title">Prime Minister</div>
            <div class="sys-leader-desc">Head of Government. Runs the country day-to-day. Leader of majority party.</div>
          </div>
          <div class="sys-leader-card">
            <div class="sys-leader-emoji">🏛️</div>
            <div class="sys-leader-title">President</div>
            <div class="sys-leader-desc">Head of State. Appoints PM. Supreme constitutional authority. <em>Example: Droupadi Murmu</em></div>
          </div>
          <div class="sys-leader-card">
            <div class="sys-leader-emoji">🏙️</div>
            <div class="sys-leader-title">Chief Minister</div>
            <div class="sys-leader-desc">Head of State Government. Runs day-to-day administration of a state.</div>
          </div>
          <div class="sys-leader-card">
            <div class="sys-leader-emoji">⚖️</div>
            <div class="sys-leader-title">Opposition Leader</div>
            <div class="sys-leader-desc">Leader of 2nd-largest party. Questions government, ensures accountability.</div>
          </div>
        </div>
      </div>

      <div class="sys-section">
        <h3>🔗 How They Connect</h3>
        <div class="sys-flow">
          <div class="sys-flow-item">👥 Citizens vote</div>
          <div class="sys-flow-arrow">→</div>
          <div class="sys-flow-item">MPs elected to Lok Sabha</div>
          <div class="sys-flow-arrow">→</div>
          <div class="sys-flow-item">Majority party forms govt</div>
          <div class="sys-flow-arrow">→</div>
          <div class="sys-flow-item">PM appointed by President</div>
        </div>
      </div>
    `
  }
};

