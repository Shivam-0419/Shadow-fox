/* ==========================================================================
   CHENNAI SUPER KINGS - PREMIUM FAN PORTAL JS
   Interactive Logic, Live Sim, State Persistence & Filtering
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // DATA LAYER (Squad, Matches, News & Default Fan Wall Posts)
    // ==========================================================================
    
    const SQUAD_DATA = [
        {
            id: 'ms-dhoni',
            name: 'MS Dhoni',
            jersey: '7',
            role: 'batsman',
            roleLabel: 'Wicketkeeper Batsman',
            country: 'India',
            initials: 'MSD',
            runs: '5243',
            wickets: '0',
            matches: '264',
            strikeRate: '137.5',
            average: '39.1',
            best: '84*',
            bio: 'Mahendra Singh Dhoni is a cricket legend and the former captain of the Chennai Super Kings. Leading the franchise to 5 IPL titles and 2 Champions League T20 trophies, his tactical masterclass, lightning-fast stumpings, and unparalleled finishing ability make him one of the most beloved figures in global sport.'
        },
        {
            id: 'ruturaj-gaikwad',
            name: 'Ruturaj Gaikwad',
            jersey: '31',
            role: 'batsman',
            roleLabel: 'Opening Batsman (Captain)',
            country: 'India',
            initials: 'RG',
            runs: '2380',
            wickets: '0',
            matches: '66',
            strikeRate: '136.9',
            average: '41.8',
            best: '101*',
            bio: 'The classy opening batsman assumed leadership of CSK in 2024. Ruturaj Gaikwad won the Orange Cap in 2021 as CSK lifted the trophy and has established himself as the anchor of the batting line-up, blending textbook cricket strokes with explosive power.'
        },
        {
            id: 'ravindra-jadeja',
            name: 'Ravindra Jadeja',
            jersey: '8',
            role: 'allrounder',
            roleLabel: 'All-Rounder',
            country: 'India',
            initials: 'RJ',
            runs: '2958',
            wickets: '160',
            matches: '240',
            strikeRate: '129.8',
            average: '27.4',
            best: '62* / 5-16',
            bio: 'An indispensable asset, "Sir" Ravindra Jadeja is widely considered one of the finest modern-day all-rounders. His lightning fielding, tight left-arm spin, and clutch power-hitting (including hitting the winning runs in IPL 2023) cement his status as a CSK legend.'
        },
        {
            id: 'shivam-dube',
            name: 'Shivam Dube',
            jersey: '25',
            role: 'allrounder',
            roleLabel: 'All-Rounder',
            country: 'India',
            initials: 'SD',
            runs: '1680',
            wickets: '6',
            matches: '63',
            strikeRate: '143.2',
            average: '30.5',
            best: '95*',
            bio: 'Since joining CSK, Shivam Dube has developed into a spin-hitting monster. Known for clearing the ropes at will with minimal effort, he plays a key role in the middle order as the primary enforcer against spinners.'
        },
        {
            id: 'matheesha-pathirana',
            name: 'Matheesha Pathirana',
            jersey: '99',
            role: 'bowler',
            roleLabel: 'Bowler',
            country: 'Sri Lanka',
            initials: 'MP',
            runs: '0',
            wickets: '46',
            matches: '26',
            strikeRate: '0.0',
            average: 'Econ: 7.9',
            best: '4-28',
            bio: 'Nicknamed "Baby Malinga" due to his unique round-arm bowling action, Sri Lanka bowler Matheesha Pathirana is CSK\'s death overs specialist. His searing yorkers exceeding 150 km/h make him incredibly difficult to score off in the final stages of an innings.'
        },
        {
            id: 'devon-conway',
            name: 'Devon Conway',
            jersey: '88',
            role: 'batsman',
            roleLabel: 'Opening Batsman',
            country: 'New Zealand',
            initials: 'DC',
            runs: '924',
            wickets: '0',
            matches: '23',
            strikeRate: '141.2',
            average: '46.1',
            best: '92*',
            bio: 'Devon Conway has been a reliable opening batsman for CSK. A highly consistent performer, the New Zealander plays spin exceptionally well and was named Player of the Match in the IPL 2023 final for his match-defining knock.'
        },
        {
            id: 'mitchell-santner',
            name: 'Mitchell Santner',
            jersey: '19',
            role: 'allrounder',
            roleLabel: 'All-Rounder',
            country: 'New Zealand',
            initials: 'MS',
            runs: '172',
            wickets: '18',
            matches: '24',
            strikeRate: '122.8',
            average: 'Econ: 6.9',
            best: '22* / 2-13',
            bio: 'Mitchell Santner is a highly intelligent left-arm orthodox spinner and useful lower-order batsman. Known for his exceptional economy rate, he consistently controls the middle overs with precision and discipline.'
        },
        {
            id: 'tushar-deshpande',
            name: 'Tushar Deshpande',
            jersey: '90',
            role: 'bowler',
            roleLabel: 'Bowler',
            country: 'India',
            initials: 'TD',
            runs: '21',
            wickets: '48',
            matches: '35',
            strikeRate: 'Econ: 8.9',
            average: '28.1',
            best: '4-27',
            bio: 'A hard-working domestic fast bowler, Tushar Deshpande emerged as CSK\'s leading wicket-taker during the victorious IPL 2023 campaign. Known for his ability to pick up wickets in the powerplay and strike under pressure.'
        }
    ];

    const MATCHES_DATA = [
        {
            id: 'match-1',
            type: 'completed',
            number: 'IPL MATCH 29',
            date: 'May 12, 2026',
            opponentInitials: 'GT',
            opponentName: 'Gujarat Titans',
            venue: 'Narendra Modi Stadium, Ahmedabad',
            status: 'Completed',
            cskScore: '196/5 (20 Ov)',
            oppScore: '191/9 (20 Ov)',
            outcome: 'CSK won by 5 runs',
            isWin: true
        },
        {
            id: 'match-2',
            type: 'completed',
            number: 'IPL MATCH 34',
            date: 'May 15, 2026',
            opponentInitials: 'MI',
            opponentName: 'Mumbai Indians',
            venue: 'Wankhede Stadium, Mumbai',
            status: 'Completed',
            cskScore: '206/4 (20 Ov)',
            oppScore: '186/6 (20 Ov)',
            outcome: 'CSK won by 20 runs',
            isWin: true
        },
        {
            id: 'match-3',
            type: 'completed',
            number: 'IPL MATCH 40',
            date: 'May 18, 2026',
            opponentInitials: 'LSG',
            opponentName: 'Lucknow Super Giants',
            venue: 'M. A. Chidambaram Stadium, Chennai',
            status: 'Completed',
            cskScore: '210/3 (20 Ov)',
            oppScore: '211/4 (19.3 Ov)',
            outcome: 'LSG won by 6 wickets',
            isWin: false
        },
        {
            id: 'match-4',
            type: 'upcoming',
            number: 'IPL MATCH 47',
            date: 'May 24, 2026 - 19:30 IST',
            opponentInitials: 'RCB',
            opponentName: 'Royal Challengers Bengaluru',
            venue: 'M. A. Chidambaram Stadium, Chennai',
            status: 'Upcoming',
            cskScore: 'TBD',
            oppScore: 'TBD',
            outcome: 'Match Starts at 7:30 PM IST',
            isWin: false
        },
        {
            id: 'match-5',
            type: 'upcoming',
            number: 'IPL MATCH 53',
            date: 'May 28, 2026 - 19:30 IST',
            opponentInitials: 'KKR',
            opponentName: 'Kolkata Knight Riders',
            venue: 'Eden Gardens, Kolkata',
            status: 'Upcoming',
            cskScore: 'TBD',
            oppScore: 'TBD',
            outcome: 'Upcoming Match Campaign',
            isWin: false
        }
    ];

    const NEWS_DATA = [
        {
            id: 'news-1',
            category: 'Match Preview',
            date: 'May 22, 2026',
            title: 'Captain Ruturaj Gaikwad Gears Up for Massive Southern Derby at Chepauk',
            snippet: 'Ahead of the highly anticipated clash against RCB, skipper Ruturaj Gaikwad talks about spin matchups, dew factors, and preparing a special fortress plan.'
        },
        {
            id: 'news-2',
            category: 'Squad Update',
            date: 'May 21, 2026',
            title: 'Matheesha Pathirana Resumes Full Training with Slinging Yorkers',
            snippet: 'Excellent news for the Yellow Army as death overs specialist Pathirana completes active rehab and sends wood flying in training sessions with blistering pace.'
        },
        {
            id: 'news-3',
            category: 'Interview',
            date: 'May 19, 2026',
            title: 'Shivam Dube: "The Freedom Given by CSK Team Management Unlocked My Power"',
            snippet: 'The destructive middle-order enforcer reflects on batting roles, working with MS Dhoni, and hitting towering sixes at the iconic Chepauk stadium.'
        },
        {
            id: 'news-4',
            category: 'Community',
            date: 'May 17, 2026',
            title: 'CSK Fans Ignite the Streets of Chennai in Massive "Whistle Rally"',
            snippet: 'Over twenty thousand die-hard fans painted the city yellow during the weekend fan parade, expressing their absolute devotion to MS Dhoni and the boys.'
        }
    ];

    const DEFAULT_FAN_POSTS = [
        { name: 'DhoniFc_Forever', badge: '🦁', msg: 'Thala Dhoni walking out at Chepauk gives me literal goosebumps every single time! Whistle Podu forever! 💛' },
        { name: 'RutuFanClub', badge: '⚡', msg: 'Ruturaj is leading the team with absolute class. The future is in safe hands. Let\'s conquer the tournament!' },
        { name: 'CricketCrazy99', badge: '🏏', msg: 'Chepauk turning into a sea of yellow is the most beautiful sight in all of sport. Can\'t wait for Sunday!' },
        { name: 'SuperKing_Aman', badge: '💛', msg: 'Jadeja hitting those two boundaries in 2023 will remain etched in my heart until my last breath. Let\'s go CSK!' }
    ];

    // ==========================================================================
    // INITIALIZATION & STATE MANAGEMENT
    // ==========================================================================
    
    // Whistles Counter State
    let totalWhistles = parseInt(localStorage.getItem('csk_whistles_count')) || 1245680;
    document.getElementById('whistle-counter-display').textContent = totalWhistles.toLocaleString();

    // Fan Poll State
    let pollVoted = localStorage.getItem('csk_poll_voted') === 'true';
    let pollVoteChoice = localStorage.getItem('csk_poll_choice') || '';
    
    let pollVotes = JSON.parse(localStorage.getItem('csk_poll_votes_data')) || {
        ruturaj: 1120,
        dube: 640,
        dhoni: 1450,
        rachin: 340
    };

    // Fan Wall Wall posts State
    let fanPosts = JSON.parse(localStorage.getItem('csk_fan_posts_feed'));
    if (!fanPosts) {
        fanPosts = [...DEFAULT_FAN_POSTS];
        localStorage.setItem('csk_fan_posts_feed', JSON.stringify(fanPosts));
    }

    // ==========================================================================
    // ROUTING / TAB SYSTEM
    // ==========================================================================
    
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Smooth SPA tab toggle
    function switchTab(tabId) {
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabId) {
                content.classList.add('active');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-tab') === tabId) {
                link.classList.add('active');
            }
        });

        // Synchronize browser history / URL hash silently
        if (window.location.hash !== `#${tabId}`) {
            history.pushState(null, null, `#${tabId}`);
        }

        // Close mobile menu if active
        navMenu.classList.remove('active');
        mobileToggleBtn.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';

        // Scroll page to top smoothly on tab switch
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Event listeners on tabs
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = link.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    // Handle deep linking on load
    function handleInitialHash() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const correspondingTab = document.getElementById(hash);
            if (correspondingTab) {
                switchTab(hash);
                return;
            }
        }
        switchTab('home'); // Default fallback
    }

    // Handle footer and hero inner links clicking
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.nav-trigger');
        if (trigger) {
            e.preventDefault();
            const target = trigger.getAttribute('data-target');
            switchTab(target);
        }
    });

    // Mobile Navigation burger toggle
    mobileToggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            mobileToggleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else {
            mobileToggleBtn.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
        }
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggleBtn.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggleBtn.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
        }
    });

    // ==========================================================================
    // DECORATIVE & SCROLL EFFECTS
    // ==========================================================================
    
    // Top scroll progress indicator & Header scroll resize
    const mainHeader = document.querySelector('.main-header');
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        // Progress bar width
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';

        // Sticky Nav shrink
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // WHISTLE CHEERING INTERACTIVE WIDGET
    // ==========================================================================
    
    const blowWhistleBtn = document.getElementById('blow-whistle-btn');
    const navWhistleBtn = document.getElementById('nav-whistle-btn');
    const whistleVisualEffect = document.getElementById('whistle-visual-effect');
    const whistleCounterDisplay = document.getElementById('whistle-counter-display');

    function triggerWhistleCheer() {
        // Increment Counter
        totalWhistles += 1;
        localStorage.setItem('csk_whistles_count', totalWhistles);
        whistleCounterDisplay.textContent = totalWhistles.toLocaleString();

        // Flash visual ripple overlays
        whistleVisualEffect.classList.add('active');
        
        // Remove after animation completes
        setTimeout(() => {
            whistleVisualEffect.classList.remove('active');
        }, 850);
    }

    blowWhistleBtn.addEventListener('click', triggerWhistleCheer);
    navWhistleBtn.addEventListener('click', () => {
        // Route to home to show the effect clearly, then blow whistle
        switchTab('home');
        setTimeout(triggerWhistleCheer, 200);
    });

    // ==========================================================================
    // LIVE MATCH SCORE SIMULATOR
    // ==========================================================================
    
    // Match simulation state variables
    let simScoreCSK = 188;
    let simWicketsCSK = 4;
    let simOversCSK = 18.2;
    let simOversVal = 110; // Total balls bowled in CSK innings (18.2 = 18 * 6 + 2 = 110 balls)
    let currentDubeRuns = 48;
    let currentDubeBalls = 22;
    let currentGaikwadRuns = 84;
    let targetMI = 205; // MI scored 204/8 (20 Ov). Target for CSK to win is 205 runs.
    
    const cskScoreElem = document.getElementById('csk-score');
    const cskOversElem = document.getElementById('csk-overs');
    const matchEqElem = document.getElementById('match-equation-text');
    const batterElem = document.getElementById('current-batsman');
    const bowlerElem = document.getElementById('current-bowler');
    const commContainer = document.getElementById('commentary-feed-container');

    const commentaryTemplates = {
        six: [
            "<strong>SIX!</strong> What a shot! Launches it straight over the bowler's head. Clean strike, Chepauk is deafening!",
            "<strong>SIX MORE!</strong> Shivam Dube stands tall and dispatches this length ball high into the stands over mid-wicket!",
            "<strong>MASSIVE SIX!</strong> Ruturaj Gaikwad skips down the track and lofts it cleanly over long-off. Pure elegance!"
        ],
        four: [
            "<strong>FOUR!</strong> Beautiful boundary. Pierces the gap between extra-cover and sweeper cover with perfect timing.",
            "<strong>FOUR!</strong> Edge and flies wide of third man. Lucky, but CSK will take it gladly!",
            "<strong>FOUR RUNS!</strong> Short ball pulled away fiercely to the deep square-leg boundary."
        ],
        wicket: [
            "<strong>WICKET!</strong> Oh no, he's gone! Clean bowled. A superb yorker that rattles the stumps. Massive twist in the tale!",
            "<strong>WICKET!</strong> Caught! Tries to clear the long-on boundary but mistimes it. A simple catch taken under pressure.",
            "<strong>RUN OUT!</strong> Chaos in the middle. Direct hit at the striker's end. A diving effort, but he is short of his crease!"
        ],
        runs: [
            "Driven down to long-on for a comfortable single.",
            "Tucked away to deep mid-wicket for a brace. Excellent running between the wickets!",
            "Guided down to third man for a quick single to keep the strike rotating."
        ],
        dot: [
            "A searing delivery beat the outside edge. Excellent dot ball under pressure.",
            "Played back defensively to the bowler. No run.",
            "Well bowled! A slower bouncer that foxes the batter completely."
        ]
    };

    function simulateNextBall() {
        if (simScoreCSK >= targetMI) {
            // Already won, reset simulation after a brief period
            resetSimScorecard();
            return;
        }

        if (simWicketsCSK >= 10 || simOversVal >= 120) {
            // Match over (Lost or Draw) - reset
            resetSimScorecard();
            return;
        }

        // Increment Ball counts
        simOversVal += 1;
        const oversDec = Math.floor(simOversVal / 6);
        const ballsDec = simOversVal % 6;
        simOversCSK = parseFloat(`${oversDec}.${ballsDec}`);

        // Random Cricket Outcomes
        const randomFactor = Math.random();
        let ballOutcome = '';
        let runsScored = 0;
        let wicketFell = false;
        let commText = '';

        if (randomFactor < 0.05) { // 5% chance of wicket
            wicketFell = true;
            simWicketsCSK += 1;
            ballOutcome = 'W';
            commText = commentaryTemplates.wicket[Math.floor(Math.random() * commentaryTemplates.wicket.length)];
        } else if (randomFactor < 0.20) { // 15% chance of six
            runsScored = 6;
            ballOutcome = '6';
            commText = commentaryTemplates.six[Math.floor(Math.random() * commentaryTemplates.six.length)];
        } else if (randomFactor < 0.38) { // 18% chance of four
            runsScored = 4;
            ballOutcome = '4';
            commText = commentaryTemplates.four[Math.floor(Math.random() * commentaryTemplates.four.length)];
        } else if (randomFactor < 0.80) { // 42% chance of 1 or 2 runs
            const isDouble = Math.random() > 0.7;
            runsScored = isDouble ? 2 : 1;
            ballOutcome = runsScored.toString();
            commText = commentaryTemplates.runs[Math.floor(Math.random() * commentaryTemplates.runs.length)] + ` (${runsScored} Run${isDouble?'s':''})`;
        } else { // 20% chance of dot ball
            runsScored = 0;
            ballOutcome = '0';
            commText = commentaryTemplates.dot[Math.floor(Math.random() * commentaryTemplates.dot.length)];
        }

        // Update scores
        simScoreCSK += runsScored;
        
        // Update batter stats (Simulate Shivam Dube taking strike most of the time)
        currentDubeBalls += 1;
        currentDubeRuns += runsScored;

        // Render Updates
        cskScoreElem.textContent = `${simScoreCSK}/${simWicketsCSK}`;
        cskOversElem.textContent = `(${oversDec}.${ballsDec} Ov)`;
        batterElem.textContent = `Shivam Dube ${currentDubeRuns}*(${currentDubeBalls})`;

        // Re-calculate equation
        const remainingBalls = 120 - simOversVal;
        const runsNeeded = targetMI - simScoreCSK;

        if (simScoreCSK >= targetMI) {
            matchEqElem.textContent = `🏆 CHENNAI SUPER KINGS WIN BY ${10 - simWicketsCSK} WICKETS! WHISTLES ECHO ACROSS CHEPAUK!`;
            matchEqElem.style.color = '#10b981';
            addCommentaryFeed(simOversCSK, `<strong>GAME OVER!</strong> CSK pulls off an spectacular victory! The crowd is going wild. Players rush onto the pitch to celebrate. Chennai rules! 💛🦁`);
        } else if (simWicketsCSK >= 10) {
            matchEqElem.textContent = `Mumbai Indians won by ${runsNeeded - 1} runs. Better luck next time for the Yellow Army!`;
            matchEqElem.style.color = '#ef4444';
            addCommentaryFeed(simOversCSK, `<strong>OUT! ALL OUT!</strong> MI wins a nail-biting thriller. Valiant fightback from Chennai, but they fall just short.`);
        } else if (remainingBalls <= 0) {
            matchEqElem.textContent = `Mumbai Indians won by ${runsNeeded} runs. Dramatic finish at Chepauk!`;
            matchEqElem.style.color = '#ef4444';
            addCommentaryFeed(simOversCSK, `<strong>MATCH FINISHED!</strong> MI defends the target successfully in the final over.`);
        } else {
            matchEqElem.textContent = `CSK needs ${runsNeeded} run${runsNeeded>1?'s':''} in ${remainingBalls} ball${remainingBalls>1?'s':''} to win.`;
            matchEqElem.style.color = 'var(--csk-yellow)';
            
            // Add Commentary
            addCommentaryFeed(simOversCSK, commText);
        }
    }

    function addCommentaryFeed(over, text) {
        const commRow = document.createElement('div');
        commRow.className = 'commentary-row';
        if (text.includes('SIX') || text.includes('FOUR') || text.includes('WICKET') || text.includes('GAME OVER')) {
            commRow.classList.add('highlight-comm');
        }
        commRow.innerHTML = `<span class="ball-number">${over.toFixed(1)}</span> <span class="commentary-text">${text}</span>`;
        
        commContainer.insertBefore(commRow, commContainer.firstChild);
        
        // Keep feed capped
        if (commContainer.children.length > 25) {
            commContainer.removeChild(commContainer.lastChild);
        }
    }

    function resetSimScorecard() {
        simScoreCSK = 188;
        simWicketsCSK = 4;
        simOversCSK = 18.2;
        simOversVal = 110;
        currentDubeRuns = 48;
        currentDubeBalls = 22;
        matchEqElem.style.color = 'var(--csk-yellow)';
        
        cskScoreElem.textContent = `${simScoreCSK}/${simWicketsCSK}`;
        cskOversElem.textContent = `(18.2 Ov)`;
        matchEqElem.textContent = `CSK needs 17 runs in 10 balls to win.`;
        batterElem.textContent = `Shivam Dube 48*(22)`;
        
        commContainer.innerHTML = `
            <div class="commentary-row highlight-comm">
                <span class="ball-number">18.2</span>
                <span class="commentary-text"><strong>SIX!</strong> Dube launches it! A massive hit over deep mid-wicket. Chepauk erupts in joy! Whistles are echoing!</span>
            </div>
            <div class="commentary-row">
                <span class="ball-number">18.1</span>
                <span class="commentary-text">Bumrah bowls a searing yorker. Dube squeezes it away to deep cover for a tight double. Outstanding running!</span>
            </div>
        `;
    }

    // Set simulator interval (runs every 9 seconds)
    setInterval(simulateNextBall, 9000);

    // ==========================================================================
    // SQUAD SECTION (Rendering, Filter & Details Modals)
    // ==========================================================================
    
    const rosterContainer = document.getElementById('roster-container');
    const squadFilterBtns = document.querySelectorAll('.filter-btn');
    const playerModal = document.getElementById('player-modal');
    const modalContentArea = document.getElementById('modal-content-area');
    const modalCloseBtn = document.getElementById('modal-close');

    // Populate Roster Grid
    function renderRoster(filter = 'all') {
        rosterContainer.innerHTML = '';
        const filteredPlayers = SQUAD_DATA.filter(player => filter === 'all' || player.role === filter);
        
        filteredPlayers.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.className = 'player-card glass-panel';
            playerCard.setAttribute('data-player-id', player.id);
            
            playerCard.innerHTML = `
                <div class="player-card-glow"></div>
                <div class="player-avatar-box">
                    ${player.initials}
                    <div class="player-jersey-num">${player.jersey}</div>
                </div>
                <span class="player-role-badge">${player.roleLabel}</span>
                <h3 class="player-name">${player.name}</h3>
                <span class="player-country"><i class="fa-solid fa-earth-asia"></i> ${player.country}</span>
                
                <div class="player-preview-stats">
                    <div class="preview-stat">
                        <span class="p-lbl">Matches</span>
                        <span class="p-val">${player.matches}</span>
                    </div>
                    <div class="preview-stat">
                        <span class="p-lbl">${player.role === 'bowler' ? 'Wickets' : 'Runs'}</span>
                        <span class="p-val">${player.role === 'bowler' ? player.wickets : player.runs}</span>
                    </div>
                    <div class="preview-stat">
                        <span class="p-lbl">S/R</span>
                        <span class="p-val">${player.strikeRate}</span>
                    </div>
                </div>
                <div class="card-action-hint">VIEW FULL DETAILS <i class="fa-solid fa-circle-arrow-right"></i></div>
            `;
            
            // Modal Open click trigger
            playerCard.addEventListener('click', () => openPlayerModal(player.id));
            rosterContainer.appendChild(playerCard);
        });
    }

    // Filters Clicking
    squadFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            squadFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderRoster(btn.getAttribute('data-filter'));
        });
    });

    // Populate and open Player Detailed Modal
    function openPlayerModal(playerId) {
        const player = SQUAD_DATA.find(p => p.id === playerId);
        if (!player) return;

        const dynamicContent = `
            <div class="modal-profile-header">
                <div class="modal-profile-avatar">
                    ${player.initials}
                </div>
                <div class="modal-profile-title">
                    <h3>${player.name}</h3>
                    <div class="modal-player-meta">
                        <span class="m-meta-pill">Jersey #${player.jersey}</span>
                        <span class="m-meta-pill"><i class="fa-solid fa-user-ninja"></i> ${player.roleLabel}</span>
                        <span class="m-meta-pill"><i class="fa-solid fa-flag"></i> ${player.country}</span>
                    </div>
                </div>
            </div>
            
            <p class="modal-player-bio">${player.bio}</p>
            
            <div class="modal-stats-table-wrapper">
                <div class="modal-stats-title"><i class="fa-solid fa-circle-info"></i> IPL CAREER STATISTICS</div>
                <table class="modal-stats-table">
                    <thead>
                        <tr>
                            <th>IPL Matches</th>
                            <th>Runs Scored</th>
                            <th>Wickets Taken</th>
                            <th>Batting Avg</th>
                            <th>Strike Rate</th>
                            <th>Career Best</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${player.matches}</td>
                            <td>${player.runs}</td>
                            <td>${player.wickets}</td>
                            <td>${player.average}</td>
                            <td>${player.strikeRate}</td>
                            <td>${player.best}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

        modalContentArea.innerHTML = dynamicContent;
        playerModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    }

    function closePlayerModal() {
        playerModal.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scroll
    }

    modalCloseBtn.addEventListener('click', closePlayerModal);
    
    // Close modal on background overlay click
    playerModal.addEventListener('click', (e) => {
        if (e.target === playerModal) {
            closePlayerModal();
        }
    });

    // Handle ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePlayerModal();
        }
    });

    // ==========================================================================
    // MATCH SCHEDULE & TIMELINE MODULE
    // ==========================================================================
    
    const matchesContainer = document.getElementById('matches-timeline-container');
    const matchesFilterBtns = document.querySelectorAll('.match-filter-btn');

    function renderMatches(filter = 'all') {
        matchesContainer.innerHTML = '';
        const filteredMatches = MATCHES_DATA.filter(match => filter === 'all' || match.type === filter);

        filteredMatches.forEach(match => {
            const matchItem = document.createElement('div');
            matchItem.className = `timeline-item ${match.type === 'completed' ? 'completed' : ''}`;
            
            matchItem.innerHTML = `
                <div class="timeline-dot">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                
                <div class="timeline-card glass-panel ${match.isWin ? 'highlight-border' : ''}">
                    <div class="timeline-card-header">
                        <span class="t-match-num">${match.number}</span>
                        <span class="t-date-box"><i class="fa-regular fa-clock"></i> ${match.date}</span>
                    </div>
                    
                    <div class="timeline-card-body">
                        <div class="timeline-team-item">
                            <div class="timeline-team-initials csk">CSK</div>
                            <span class="timeline-team-name">Chennai Super Kings</span>
                        </div>
                        
                        <div class="timeline-vs">VS</div>
                        
                        <div class="timeline-team-item">
                            <div class="timeline-team-initials opp">${match.opponentInitials}</div>
                            <span class="timeline-team-name">${match.opponentName}</span>
                        </div>
                    </div>
                    
                    <div class="timeline-card-footer">
                        <span class="t-venue"><i class="fa-solid fa-location-dot"></i> ${match.venue}</span>
                        <span class="t-status-badge ${match.type === 'completed' ? (match.isWin ? 'win' : '') : 'upcoming'}">
                            ${match.type === 'completed' ? match.outcome : 'Upcoming Fixture'}
                        </span>
                    </div>
                </div>
            `;
            
            matchesContainer.appendChild(matchItem);
        });
    }

    // Match Filter click listeners
    matchesFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            matchesFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderMatches(btn.getAttribute('data-match-filter'));
        });
    });

    // ==========================================================================
    // INTERACTIVE POLL MODULE (State Persistence, Animations)
    // ==========================================================================
    
    const pollOptionsBox = document.getElementById('poll-options-box');
    const pollVotesDisplay = document.getElementById('poll-votes-display');
    const resetVoteBtn = document.getElementById('reset-vote-btn');

    function renderPoll() {
        pollOptionsBox.innerHTML = '';
        
        // Calculate total votes
        const total = Object.values(pollVotes).reduce((a, b) => a + b, 0);
        pollVotesDisplay.innerHTML = `<i class="fa-solid fa-check-double"></i> ${total.toLocaleString()} total votes cast`;

        // Render options buttons
        Object.keys(pollVotes).forEach(optionKey => {
            const voteCount = pollVotes[optionKey];
            const percentage = total > 0 ? Math.round((voteCount / total) * 100) : 0;
            
            const optionBtn = document.createElement('button');
            optionBtn.className = 'poll-option-btn';
            optionBtn.setAttribute('data-option', optionKey);

            if (pollVoted && pollVoteChoice === optionKey) {
                optionBtn.classList.add('my-vote');
            }

            const labelMap = {
                ruturaj: 'Ruturaj Gaikwad',
                dube: 'Shivam Dube',
                dhoni: 'MS Dhoni',
                rachin: 'Rachin Ravindra'
            };

            optionBtn.innerHTML = `
                <span class="option-name">${labelMap[optionKey]}</span>
                <span class="option-percentage">${percentage}%</span>
                <div class="option-bg-progress" style="width: ${pollVoted ? percentage : 0}%"></div>
            `;

            // Click listener for voting
            if (!pollVoted) {
                optionBtn.addEventListener('click', () => castVote(optionKey));
            }

            pollOptionsBox.appendChild(optionBtn);
        });

        if (pollVoted) {
            pollOptionsBox.classList.add('voted');
            resetVoteBtn.style.display = 'inline-block';
        } else {
            pollOptionsBox.classList.remove('voted');
            resetVoteBtn.style.display = 'none';
        }
    }

    function castVote(optionKey) {
        if (pollVoted) return;

        pollVotes[optionKey] += 1;
        pollVoted = true;
        pollVoteChoice = optionKey;

        // Persist in localStorage
        localStorage.setItem('csk_poll_voted', 'true');
        localStorage.setItem('csk_poll_choice', optionKey);
        localStorage.setItem('csk_poll_votes_data', JSON.stringify(pollVotes));

        // Re-render poll with transition values
        renderPoll();
    }

    // Reset button handler
    resetVoteBtn.addEventListener('click', () => {
        if (!pollVoted) return;

        // Decrement our choice to make it fair
        if (pollVotes[pollVoteChoice] > 0) {
            pollVotes[pollVoteChoice] -= 1;
        }

        pollVoted = false;
        pollVoteChoice = '';

        // Remove from storage
        localStorage.removeItem('csk_poll_voted');
        localStorage.removeItem('csk_poll_choice');
        localStorage.setItem('csk_poll_votes_data', JSON.stringify(pollVotes));

        renderPoll();
    });

    // ==========================================================================
    // FAN WALL MESSAGING MODULE (Localstorage Board Feed)
    // ==========================================================================
    
    const fanWallForm = document.getElementById('fan-wall-form');
    const fanWallFeed = document.getElementById('fan-wall-feed');

    function renderFanWall() {
        fanWallFeed.innerHTML = '';
        
        fanPosts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'wall-post';
            
            // Get initials for profile badge
            const initials = post.name.substring(0, 2).toUpperCase();

            postCard.innerHTML = `
                <div class="post-avatar">${initials}</div>
                <div class="post-content">
                    <div class="post-header">
                        <span class="post-author">${post.name}</span>
                        <span class="post-badge">${post.badge}</span>
                    </div>
                    <p class="post-msg">${post.msg}</p>
                </div>
            `;
            
            fanWallFeed.appendChild(postCard);
        });
    }

    fanWallForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('fan-name');
        const msgInput = document.getElementById('fan-msg');
        const badgeSelect = document.getElementById('fan-badge');

        const newPost = {
            name: nameInput.value.trim(),
            badge: badgeSelect.value,
            msg: msgInput.value.trim()
        };

        // Prepend new post
        fanPosts.unshift(newPost);
        localStorage.setItem('csk_fan_posts_feed', JSON.stringify(fanPosts));

        // Clear input values
        nameInput.value = '';
        msgInput.value = '';

        // Re-render feed
        renderFanWall();
    });

    // ==========================================================================
    // NEWS GRID RENDERER
    // ==========================================================================
    
    const newsContainer = document.getElementById('news-container');

    function renderNews() {
        newsContainer.innerHTML = '';

        NEWS_DATA.forEach(news => {
            const newsCard = document.createElement('div');
            newsCard.className = 'news-card glass-panel';
            
            newsCard.innerHTML = `
                <div class="news-img-box">
                    <i class="fa-solid fa-newspaper news-img-placeholder"></i>
                    <span class="news-category-tag">${news.category}</span>
                </div>
                <div class="news-content">
                    <span class="news-date"><i class="fa-regular fa-calendar"></i> ${news.date}</span>
                    <h3 class="news-title">${news.title}</h3>
                    <p class="news-snippet">${news.snippet}</p>
                    <a href="#" class="news-link">READ ARTICLE <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            `;
            
            // Dummy click prevention
            newsCard.querySelector('.news-link').addEventListener('click', (e) => e.preventDefault());
            
            newsContainer.appendChild(newsCard);
        });
    }

    // ==========================================================================
    // GENERAL APP EXECUTION ON LOAD
    // ==========================================================================
    
    // Check initial anchor for SPA routing on load
    handleInitialHash();
    
    // Listen to hash changes in browser url
    window.addEventListener('hashchange', handleInitialHash);

    // Initial renders
    renderRoster();
    renderMatches();
    renderPoll();
    renderFanWall();
    renderNews();

});
