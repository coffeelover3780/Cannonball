
# How to Get Your Google Gemini API Key

To enable the AI commentator in the "Cannonball!" game, you need a Google Gemini API key. The process is free and only takes a couple of minutes.

Here are the steps to get your key:

### Step 1: Visit Google AI Studio

Go to the official Google AI Studio website:

**[https://aistudio.google.com/](https://aistudio.google.com/)**

### Step 2: Sign In

You will be prompted to sign in with your Google account.

### Step 3: Create Your API Key

Once you are in Google AI Studio, look for a button or link that says **"Get API key"** or **"Create API key"**. It is typically located in the top-left or top-right corner of the dashboard.

Click on it, and you may be prompted to create a new project if you don't have one already.

### Step 4: Copy Your Key

A new API key will be generated for you. It will be a long string of letters and numbers. Click the "Copy" button to copy it to your clipboard.

### Step 5: Add the Key to Your Project

Now that you have your key, you need to add it to the game project.

1.  In your project folder, find the file named `.env.example`.
2.  Create a copy of it and rename the copy to **`.env.local`**.
3.  Open the new `.env.local` file and paste your API key into it, like this:

    ```
    VITE_API_KEY=YOUR_COPIED_API_KEY_HERE
    ```

    Replace `YOUR_COPIED_API_KEY_HERE` with the key you just copied.

### Important: Keep Your Key Secure

Your API key is like a password. **Do not share it publicly** or commit it to version control (like GitHub). The `.gitignore` file in this project is already configured to ignore the `.env.local` file, so your key will remain private.

That's it! Once the key is in your `.env.local` file, the AI commentator will be fully functional when you run the game.
