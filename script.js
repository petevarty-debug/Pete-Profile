/*
    ====================================================================
    INTERACTIVE JAVASCRIPT FOR PETE'S PROFILE PAGE
    ====================================================================
    
    WHAT IS JAVASCRIPT?
    -------------------
    If HTML is the skeleton and CSS is the skin/clothes, then JavaScript
    is the BRAIN and MUSCLES. It makes things move, respond to clicks,
    and change based on user actions!
    
    THIS FILE CONTAINS:
    - Dark/Light mode theme toggle
    - Memory system (localStorage) to remember your theme choice
    - Parallax effects (moving orbs that follow your mouse)
    - Hover animations for hobby cards
    - Smooth scrolling effects
    
    ====================================================================
*/


/* ==========================================
   PART 1: DARK MODE / LIGHT MODE TOGGLE
   ==========================================
   This section makes the theme button work! When you click the button,
   it switches between dark mode and light mode.
*/

// STEP 1: Get references to the HTML elements we need to control
// Think of this like finding the right buttons and switches in your house
const themeToggle = document.getElementById('themeToggle'); // The actual button
const themeIcon = document.getElementById('themeIcon');     // The moon/sun emoji inside the button
const root = document.documentElement;                      // The entire HTML document (the "root")

/*
    WHAT IS "document.getElementById"?
    ----------------------------------
    This is like asking the browser: "Hey, find me the element with this ID!"
    In our HTML, we gave the button an id="themeToggle"
    Now we can control that button from JavaScript!
*/


// STEP 2: Check if the user has already chosen a theme before
// We look in "localStorage" - the browser's memory box!
const currentTheme = localStorage.getItem('theme') || 'dark';

/*
    WHAT IS localStorage?
    ---------------------
    localStorage is like a browser's notebook where it writes down things
    to remember, even after you close the page!
    
    - localStorage.getItem('theme') = "Hey browser, what did we write for 'theme'?"
    - If there's nothing written (null), we use 'dark' as the default (that's what || 'dark' does)
    
    EXAMPLE:
    - First visit: localStorage.getItem('theme') returns null → use 'dark'
    - Second visit: localStorage.getItem('theme') returns 'light' → use 'light'
*/


// STEP 3: Apply the theme we found (or the default 'dark')
root.setAttribute('data-theme', currentTheme);

/*
    WHAT DOES setAttribute DO?
    ---------------------------
    This sets an attribute (a property) on the HTML element.
    We're adding data-theme="dark" or data-theme="light" to the <html> tag.
    
    Our CSS file watches for this! When it sees data-theme="light",
    it changes all the colors to light mode. Pretty clever, right?
*/


// STEP 4: Update the button icon to match the current theme
updateThemeIcon(currentTheme);

/*
    We're calling our own function (defined below) that changes the emoji
    from 🌙 (moon for dark mode) to ☀️ (sun for light mode)
*/


// STEP 5: Listen for button clicks and switch themes!
themeToggle.addEventListener('click', () => {
    /*
        WHAT IS addEventListener?
        -------------------------
        This tells JavaScript: "Hey, when someone CLICKS this button, run this code!"
        It's like setting up a tripwire - when triggered, it does something.
        
        The '() => { }' is called an "arrow function" - it's the code that runs when clicked.
    */

    // Check what theme we're currently using
    const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

    /*
        TERNARY OPERATOR EXPLAINED:
        ---------------------------
        The '? :' is a shorthand if/else statement. It reads like this:
        
        condition ? valueIfTrue : valueIfFalse
        
        In plain English:
        "If the current theme is 'dark', then newTheme = 'light', otherwise newTheme = 'dark'"
        
        It's a quick way to flip between two values!
    */

    // Apply the new theme to the page
    root.setAttribute('data-theme', newTheme);

    // Save the new theme to browser memory so it remembers next time
    localStorage.setItem('theme', newTheme);

    // Update the button icon (moon or sun)
    updateThemeIcon(newTheme);
});


// STEP 6: Helper function to update the theme icon
function updateThemeIcon(theme) {
    /*
        WHAT IS A FUNCTION?
        -------------------
        A function is like a recipe or a reusable set of instructions.
        Instead of writing the same code multiple times, we put it in a
        function and "call" it whenever we need it!
        
        This function takes a "theme" (either 'dark' or 'light') and
        changes the emoji accordingly.
    */

    themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';

    /*
        textContent changes the text inside an HTML element.
        If theme is 'dark', show '🌙'
        If theme is 'light', show '☀️'
    */
}


/* ==========================================
   PART 2: SMOOTH SCROLLING
   ==========================================
   This makes the page scroll smoothly instead of jumping instantly
*/

document.documentElement.style.scrollBehavior = 'smooth';

/*
    This one line adds smooth, animated scrolling to the entire page!
    Try clicking a link that jumps to a section - it'll glide instead of snap.
*/


/* ==========================================
   PART 3: HOBBY CARD HOVER ANIMATIONS
   ==========================================
   When you hover over hobby cards, this code makes the emoji
   icons grow and rotate!
*/

// STEP 1: Find ALL hobby cards on the page (there are 2 of them)
const hobbyCards = document.querySelectorAll('.hobby-card');

/*
    WHAT IS querySelectorAll?
    --------------------------
    This finds ALL elements that match a CSS selector (like '.hobby-card')
    It returns a list of elements, even if there's only one!
    
    In our case, it finds both hobby cards (💻 and 🚀)
*/


// STEP 2: Loop through each hobby card and add hover effects
hobbyCards.forEach(card => {
    /*
        WHAT IS forEach?
        ----------------
        forEach loops through each item in a list and runs code for each one.
        It's like saying: "For each hobby card, do this..."
        
        'card' is a temporary name for each hobby card as we loop through
    */

    // When mouse ENTERS the card (hover on)
    card.addEventListener('mouseenter', function (e) {
        // Find the icon inside this specific card
        const icon = this.querySelector('.hobby-icon');

        // Transform it: make it bigger (1.2x) and rotate 10 degrees
        icon.style.transform = 'scale(1.2) rotate(10deg)';

        // Make the transformation smooth (animate it)
        icon.style.transition = 'transform 0.3s ease';

        /*
            CSS TRANSFORMS EXPLAINED:
            -------------------------
            - scale(1.2) = make it 120% of original size (20% bigger)
            - rotate(10deg) = rotate it 10 degrees clockwise
            - transition = animate the change over 0.3 seconds smoothly
        */
    });

    // When mouse LEAVES the card (hover off)
    card.addEventListener('mouseleave', function (e) {
        // Find the icon again
        const icon = this.querySelector('.hobby-icon');

        // Reset to normal: original size (1.0) and no rotation (0 degrees)
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});


/* ==========================================
   PART 4: PARALLAX EFFECT FOR FLOATING ORBS
   ==========================================
   This makes the glowing orbs move based on your mouse position!
   It creates a 3D-like parallax effect.
*/

document.addEventListener('mousemove', (e) => {
    /*
        This listens for mouse movement ANYWHERE on the page.
        Every time you move your mouse, this code runs!
        
        'e' is the "event" object - it contains info about the mouse position
    */

    // Find all the floating orb elements
    const orbs = document.querySelectorAll('.floating-orb');

    // Calculate mouse position as a percentage (0.0 to 1.0)
    const x = e.clientX / window.innerWidth;  // Horizontal position (0 = left edge, 1 = right edge)  
    const y = e.clientY / window.innerHeight; // Vertical position (0 = top edge, 1 = bottom edge)

    /*
        WHY CONVERT TO PERCENTAGE?
        --------------------------
        clientX and clientY give pixel values (like 500px from left)
        We divide by window width/height to get a number between 0 and 1
        This works on any screen size!
        
        EXAMPLE:
        - Mouse at center of 1920px screen: x = 960/1920 = 0.5
        - Mouse at right edge: x = 1920/1920 = 1.0
    */

    // Move each orb slightly based on mouse position
    orbs.forEach((orb, index) => {
        /*
            PARALLAX EFFECT EXPLAINED:
            --------------------------
            Different orbs move at different speeds! This creates depth.
            - Orb 1 (index 0): speed = 1 * 20 = 20
            - Orb 2 (index 1): speed = 2 * 20 = 40
            - Orb 3 (index 2): speed = 3 * 20 = 60
            
            Faster-moving orbs appear closer, slower ones appear further away!
        */

        const speed = (index + 1) * 20;

        // Calculate how far to move the orb
        const xMove = (x - 0.5) * speed; // Move left/right based on mouse
        const yMove = (y - 0.5) * speed; // Move up/down based on mouse

        /*
            THE MATH EXPLAINED:
            -------------------
            (x - 0.5) centers the movement:
            - If mouse is at left (x=0): 0 - 0.5 = -0.5 → move left
            - If mouse is at center (x=0.5): 0.5 - 0.5 = 0 → no movement
            - If mouse is at right (x=1): 1 - 0.5 = 0.5 → move right
            
            Then we multiply by speed to make it move more/less
        */

        // Apply the movement using CSS transform
        orb.style.transform = `translate(${xMove}px, ${yMove}px)`;

        // Make it smooth (not jumpy)
        orb.style.transition = 'transform 0.3s ease-out';

        /*
            TEMPLATE LITERALS EXPLAINED:
            ----------------------------- 
            The backticks `` allow us to insert variables into strings
            ${xMove} gets replaced with the actual number
            
            Example: If xMove = 15 and yMove = -10
            Result: "translate(15px, -10px)"
        */
    });
});


/* ==========================================
   PART 5: PARALLAX EFFECT FOR HERO BACKGROUND
   ==========================================
   This makes the background image move slightly when you scroll,
   creating a neat depth effect!
*/

window.addEventListener('scroll', () => {
    /*
        This listens for scrolling on the page.
        Every time you scroll, this code runs!
    */

    // How far down have we scrolled? (in pixels)
    const scrolled = window.pageYOffset;

    // Find the hero section element
    const hero = document.querySelector('.hero-section');

    // Only proceed if the hero section exists
    if (hero) {
        // Move the background image based on scroll
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';

        /*
            PARALLAX SCROLLING EXPLAINED:
            -----------------------------
            The background moves at HALF the speed of scrolling (0.5)
            
            - Scroll down 100px → background moves down 50px
            - This creates the illusion the background is "further away"
            - It's how movies create depth - closer things move faster!
            
            Try scrolling and watch the background image move slower
            than the rest of the content!
        */
    }
});


/*
    ====================================================================
    CONGRATULATIONS! 🎉
    ====================================================================
    You've reached the end of the JavaScript file!
    
    RECAP OF WHAT WE LEARNED:
    - How to select HTML elements (getElementById, querySelector)
    - How to respond to user actions (addEventListener)
    - How to save data in the browser (localStorage)
    - How to create smooth animations (CSS transforms and transitions)
    - How to create parallax effects (moving things at different speeds)
    
    NEXT STEPS:
    - Try changing the speeds of the orbs (line 235)
    - Change the parallax scroll speed (line 288)
    - Add your own animations!
    
    Have fun coding! 🚀
    ====================================================================
*/
