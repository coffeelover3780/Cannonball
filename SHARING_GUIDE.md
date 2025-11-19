
# How to Share "Cannonball!" on Social Media

Great idea! Sharing your game is the best way to get players. Here’s a guide on how to effectively share a preview of "Cannonball!" on your social media pages.

The most effective strategy is a two-part approach:
1.  **Visual Preview:** Post an engaging video or GIF directly on your social media page.
2.  **Playable Demo:** Include a link in your post that takes users to a live, playable version of the game.

---

## Method 1: Create a Visual Preview (Video or GIF)

Visuals are essential for grabbing attention on social media feeds. A short video is often more engaging than a static screenshot.

### What to Capture:
Record a short gameplay loop that shows:
1.  Aiming the cannon.
2.  Placing the prediction marker.
3.  Firing the cannon (with the cool flame effect!).
4.  The cannonball's trajectory.
5.  The final impact, showing either a successful hit (+1) or an obstacle collision (-5).

### Tools to Use:
*   **macOS:** Use the built-in screen recorder (Cmd + Shift + 5) or QuickTime Player.
*   **Windows:** Use the Xbox Game Bar (Windows Key + G).
*   **Cross-Platform:** Tools like [Kap](https://getkap.co/), [LICEcap](https://www.cockos.com/licecap/), or [Giphy Capture](https://giphy.com/apps/giphycapture) are great for creating high-quality GIFs.

---

## Method 2: Deploy a Live, Playable Demo

Sharing a link to a live demo is the ultimate preview. Since this is a web app, you can host it for free on several platforms. We'll use **Netlify** as an example because it's incredibly simple.

### Step 1: Prepare Your Project for Deployment

Your project is already set up with the necessary build tools. The goal is to get your code onto a platform like GitHub and then connect it to a hosting service.

### Step 2: Push Your Code to GitHub

1.  Create a new repository on [GitHub](https://github.com/).
2.  Follow the instructions on GitHub to upload your project files to that repository.

### Step 3: Deploy with Netlify

1.  **Sign Up:** Create a free account at [Netlify](https://www.netlify.com/).
2.  **New Site from Git:** From your Netlify dashboard, click "Add new site" -> "Import an existing project".
3.  **Connect to GitHub:** Connect your Netlify account to GitHub and authorize it.
4.  **Select Your Repository:** Choose the "cannonball-app" repository you just created.
5.  **Configure Build Settings:** Netlify will automatically detect that you have a `package.json` and suggest the correct settings. They should be:
    *   **Build command:** `npm run build` (or `vite build`)
    *   **Publish directory:** `dist`

6.  **IMPORTANT - Add the API Key:** Your live game needs the Gemini API key.
    *   In the Netlify project settings, go to "Site configuration" -> "Environment variables".
    *   Click "Add a variable" and add your key:
        *   **Key:** `VITE_API_KEY`
        *   **Value:** `YOUR_GEMINI_API_KEY_HERE` (Paste your actual key here)
    *   This securely provides the key to your app during the build process without exposing it in your code.

7.  **Deploy:** Click "Deploy site". Netlify will build your project and host it on a public URL (e.g., `your-game-name.netlify.app`).

### Step 4: Share the Link!

You now have a public URL to your live, playable game!

---

## Putting It All Together: The Perfect Social Media Post

Now, combine both methods for maximum impact.

1.  Upload the video/GIF you created in Method 1.
2.  Write a catchy post and include the live demo link from Method 2.

**Example Post for Twitter/Facebook/etc.:**

> I built a fun physics game called **Cannonball!** 🚀
>
> Aim your cannon, predict the landing spot, and fire! An AI commentator will cheer you on (or roast you!).
>
> Check out the gameplay below and try the live demo yourself!
>
> **Play here:** `https://your-game-name.netlify.app`
>
> #gamedev #react #javascript #ai #webdev

This combination gives people an instant, engaging preview while also providing a direct way for them to play, which is the best way to get them hooked!
