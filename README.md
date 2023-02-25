# Project overview

**Messenger** - an application used for messaging with relatives, colleagues or friends, implemented without any frameworks and minimum number of external libraries.

It includes the following pages:
- login (sign in) - default `/` route
- register (sign up) - `/sign-up` route
- chat - `/messenger` and `/messenger/:id` route
- settings - `/settings` route

This app is written using  **Typescript**, **SCSS**. Project is built with the help of **Webpack**.\
You need to create a personal account to start using this app.

This application was developed as part of the [Middle Frontend Developer](https://practicum.yandex.ru/middle-frontend/) course and is available [here](https://euphonious-trifle-ab3480.netlify.app/).

# Main functionality
1. `login` and `registration`forms (with validation)
<img src="https://user-images.githubusercontent.com/114503332/219871349-2c464873-6063-4890-a1a6-cc7965400519.png" width="100" />
<img src="https://user-images.githubusercontent.com/114503332/219871591-16ea2b52-0de1-458d-8e69-be9c48d8d63e.png" width="100" />
2. `chat` page with the list of chats, ability to add new ones and window for messaging. You can send text messages and files.
<img src="https://user-images.githubusercontent.com/114503332/219871775-9d52c631-4eee-4b72-854d-e1f704694d1f.png" width="100" />
<img src="https://user-images.githubusercontent.com/114503332/219871790-efba0eab-a76b-4d56-acee-7566cdd65305.png" width="100" />
3. `chat settings` include the ability to add/remove users, change chat avatar or delete it.
<img src="https://user-images.githubusercontent.com/114503332/219872030-480b412c-776d-4358-a797-4632832df5a5.png" width="100" />
4. On the settings page you may change avatar, password and other settings defined during registration.
<img src="https://user-images.githubusercontent.com/114503332/219872159-3e35cc40-481a-4d66-9e4e-7fc1977c5816.png" width="100" />
5. This application also includes two error pages. `404` for the unknown route and `5**` for server error handling.
<img src="https://user-images.githubusercontent.com/114503332/219872477-92052c12-abec-4a97-9cb6-5d868ec5cd1a.png" width="100" />
<img src="https://user-images.githubusercontent.com/114503332/219872682-5fe4d303-3c44-4066-9e3d-a43f09a7d916.png" width="100" />

# Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed on your machine.
Run `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.

### `npm run build`

Builds the app for production to the `dist` folder.\
It optimizes the build for the best performance by minifying JavaScript, CSS, and HTML, resizing and optimizing images and so on.
Your app is ready to be deployed!

### `npm run lint`

Performs code analysis with ESLint (`*.ts` files) and Stylelint (`*.scss` files).

### `npm run test`

Runs Jest tests (`*.test.ts` files).

## Useful Links

To view Figma Design please click [here](https://www.figma.com/file/UAcp9twOQHH1s8UkIoga2B/Untitled?node-id=0%3A1&t=mvcP96kY8BWzXmEV-0).\
To view deployed project (Netlify) please click [here](https://euphonious-trifle-ab3480.netlify.app/)
To view deployed project (Render) please click [here](https://kate-messenger.onrender.com/)

