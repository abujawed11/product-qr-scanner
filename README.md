# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.



```
```


```
```
react_qr_scanner
├─ app
│  ├─ (adminDashboard)
│  │  ├─ index.tsx
│  │  ├─ manage-clients.tsx
│  │  ├─ manage-kits.tsx
│  │  ├─ manage-orders.tsx
│  │  ├─ review-claim-fulldetails.tsx
│  │  ├─ review-claim-update.tsx
│  │  ├─ review-req-dashboard.tsx
│  │  ├─ review-req-warranty-status.tsx
│  │  ├─ review-req-warranty.tsx
│  │  ├─ warranty-clients.tsx
│  │  ├─ warranty-orders.tsx
│  │  ├─ warranty-requests.tsx
│  │  └─ _layout.tsx
│  ├─ (auth)
│  │  ├─ forgot-password.tsx
│  │  ├─ login.tsx
│  │  ├─ register.tsx
│  │  └─ _layout.tsx
│  ├─ (main)
│  │  ├─ about.tsx
│  │  ├─ all-orders.tsx
│  │  ├─ dashboard
│  │  │  ├─ home.tsx
│  │  │  ├─ index.tsx
│  │  │  ├─ my-orders.tsx
│  │  │  ├─ my-scans.tsx
│  │  │  ├─ qr-scanner.tsx
│  │  │  └─ _layout.tsx
│  │  ├─ kit-details.tsx
│  │  ├─ notifications.tsx
│  │  ├─ order-details.tsx
│  │  ├─ product-info.tsx
│  │  ├─ profile.tsx
│  │  ├─ settings.tsx
│  │  ├─ support.tsx
│  │  ├─ warranty
│  │  │  ├─ claim-form.tsx
│  │  │  ├─ claim-media-wizard.tsx
│  │  │  ├─ claim-steps.ts
│  │  │  ├─ index.tsx
│  │  │  ├─ warranty-card.tsx
│  │  │  └─ _layout.tsx
│  │  ├─ warranty-status.tsx
│  │  └─ _layout.tsx
│  ├─ index.tsx
│  └─ _layout.tsx
├─ app.json
├─ assets
│  ├─ fonts
│  │  └─ SpaceMono-Regular.ttf
│  └─ images
│     ├─ adaptive-icon.png
│     ├─ favicon.png
│     ├─ icon.png
│     ├─ partial-react-logo.png
│     ├─ react-logo.png
│     ├─ react-logo@2x.png
│     ├─ react-logo@3x.png
│     └─ splash-icon.png
├─ babel.config.js
├─ components
│  ├─ ChecklistStep.tsx
│  ├─ CustomAdminDrawer.tsx
│  ├─ CustomDrawer.tsx
│  ├─ FloatingInput.tsx
│  ├─ FloatingPicker.tsx
│  ├─ MediaStep.tsx
│  ├─ NotificationBell.tsx
│  ├─ ReviewStep.tsx
│  └─ UploadModal.tsx
├─ context
│  ├─ AuthContext.tsx
│  ├─ NotificationContext.tsx
│  ├─ RefreshContext.tsx
│  └─ ThemeContext.tsx
├─ eslint.config.js
├─ global.css
├─ metro.config.js
├─ nativewind-env.d.ts
├─ package-lock.json
├─ package.json
├─ README.md
├─ services
├─ tailwind.config.js
├─ tsconfig.json
├─ types
│  ├─ kit.types.ts
│  ├─ order.types.ts
│  ├─ StepMedia.ts
│  ├─ user.types.ts
│  └─ warranty.ts
└─ utils
   ├─ api.ts
   ├─ color.ts
   ├─ constants.ts
   ├─ downloadExcel.ts
   ├─ formatDate.ts
   ├─ locationUtils.ts
   ├─ mediaUtils.ts
   ├─ statusColor.ts
   └─ taskUtils.ts

```
```
react_qr_scanner
├─ app
│  ├─ (adminDashboard)
│  │  ├─ index.tsx
│  │  ├─ manage-clients.tsx
│  │  ├─ manage-kits.tsx
│  │  ├─ manage-orders.tsx
│  │  ├─ review-claim-fulldetails.tsx
│  │  ├─ review-claim-update.tsx
│  │  ├─ review-req-dashboard.tsx
│  │  ├─ review-req-warranty-status.tsx
│  │  ├─ review-req-warranty.tsx
│  │  ├─ warranty-clients.tsx
│  │  ├─ warranty-orders.tsx
│  │  ├─ warranty-requests.tsx
│  │  └─ _layout.tsx
│  ├─ (auth)
│  │  ├─ forgot-password.tsx
│  │  ├─ login.tsx
│  │  ├─ register.tsx
│  │  └─ _layout.tsx
│  ├─ (main)
│  │  ├─ about.tsx
│  │  ├─ all-orders.tsx
│  │  ├─ dashboard
│  │  │  ├─ home.tsx
│  │  │  ├─ index.tsx
│  │  │  ├─ my-orders.tsx
│  │  │  ├─ my-scans.tsx
│  │  │  ├─ qr-scanner.tsx
│  │  │  └─ _layout.tsx
│  │  ├─ kit-details.tsx
│  │  ├─ notifications.tsx
│  │  ├─ order-details.tsx
│  │  ├─ product-info.tsx
│  │  ├─ profile.tsx
│  │  ├─ settings.tsx
│  │  ├─ support.tsx
│  │  ├─ warranty
│  │  │  ├─ claim-form.tsx
│  │  │  ├─ claim-media-wizard.tsx
│  │  │  ├─ claim-steps.ts
│  │  │  ├─ index.tsx
│  │  │  ├─ warranty-card.tsx
│  │  │  └─ _layout.tsx
│  │  ├─ warranty-status.tsx
│  │  └─ _layout.tsx
│  ├─ index.tsx
│  └─ _layout.tsx
├─ app.json
├─ assets
│  ├─ fonts
│  │  └─ SpaceMono-Regular.ttf
│  └─ images
│     ├─ adaptive-icon.png
│     ├─ favicon.png
│     ├─ icon.png
│     ├─ partial-react-logo.png
│     ├─ react-logo.png
│     ├─ react-logo@2x.png
│     ├─ react-logo@3x.png
│     └─ splash-icon.png
├─ babel.config.js
├─ components
│  ├─ ChecklistStep.tsx
│  ├─ CustomAdminDrawer.tsx
│  ├─ CustomDrawer.tsx
│  ├─ FloatingInput.tsx
│  ├─ FloatingPicker.tsx
│  ├─ MediaStep.tsx
│  ├─ NotificationBell.tsx
│  ├─ ReviewStep.tsx
│  └─ UploadModal.tsx
├─ context
│  ├─ AuthContext.tsx
│  ├─ NotificationContext.tsx
│  ├─ RefreshContext.tsx
│  └─ ThemeContext.tsx
├─ eslint.config.js
├─ global.css
├─ metro.config.js
├─ nativewind-env.d.ts
├─ package-lock.json
├─ package.json
├─ README.md
├─ services
├─ tailwind.config.js
├─ tsconfig.json
├─ types
│  ├─ kit.types.ts
│  ├─ order.types.ts
│  ├─ StepMedia.ts
│  ├─ user.types.ts
│  └─ warranty.ts
└─ utils
   ├─ api.ts
   ├─ color.ts
   ├─ constants.ts
   ├─ downloadExcel.ts
   ├─ formatDate.ts
   ├─ locationUtils.ts
   ├─ mapCodeToCity.ts
   ├─ mediaUtils.ts
   ├─ statusColor.ts
   └─ taskUtils.ts

```
```
react_qr_scanner
├─ app
│  ├─ (adminDashboard)
│  │  ├─ index.tsx
│  │  ├─ manage-clients.tsx
│  │  ├─ manage-kits.tsx
│  │  ├─ manage-orders.tsx
│  │  ├─ review-claim-fulldetails.tsx
│  │  ├─ review-claim-update.tsx
│  │  ├─ review-req-dashboard.tsx
│  │  ├─ review-req-warranty-status.tsx
│  │  ├─ review-req-warranty.tsx
│  │  ├─ warranty-clients.tsx
│  │  ├─ warranty-orders.tsx
│  │  ├─ warranty-requests.tsx
│  │  └─ _layout.tsx
│  ├─ (auth)
│  │  ├─ forgot-password.tsx
│  │  ├─ login.tsx
│  │  ├─ register.tsx
│  │  └─ _layout.tsx
│  ├─ (main)
│  │  ├─ about.tsx
│  │  ├─ all-orders.tsx
│  │  ├─ dashboard
│  │  │  ├─ home.tsx
│  │  │  ├─ index.tsx
│  │  │  ├─ my-orders.tsx
│  │  │  ├─ my-scans.tsx
│  │  │  ├─ qr-scanner.tsx
│  │  │  └─ _layout.tsx
│  │  ├─ kit-details.tsx
│  │  ├─ notifications.tsx
│  │  ├─ order-details.tsx
│  │  ├─ product-info.tsx
│  │  ├─ profile.tsx
│  │  ├─ settings.tsx
│  │  ├─ support.tsx
│  │  ├─ warranty
│  │  │  ├─ claim-form.tsx
│  │  │  ├─ claim-media-wizard.tsx
│  │  │  ├─ claim-steps.ts
│  │  │  ├─ index.tsx
│  │  │  ├─ my-cards.tsx
│  │  │  ├─ warranty-card.tsx
│  │  │  └─ _layout.tsx
│  │  ├─ warranty-status.tsx
│  │  └─ _layout.tsx
│  ├─ index.tsx
│  └─ _layout.tsx
├─ app.json
├─ assets
│  ├─ fonts
│  │  └─ SpaceMono-Regular.ttf
│  └─ images
│     ├─ adaptive-icon.png
│     ├─ favicon.png
│     ├─ icon.png
│     ├─ partial-react-logo.png
│     ├─ react-logo.png
│     ├─ react-logo@2x.png
│     ├─ react-logo@3x.png
│     └─ splash-icon.png
├─ babel.config.js
├─ components
│  ├─ ChecklistStep.tsx
│  ├─ CustomAdminDrawer.tsx
│  ├─ CustomDrawer.tsx
│  ├─ FloatingInput.tsx
│  ├─ FloatingPicker.tsx
│  ├─ MediaStep.tsx
│  ├─ NotificationBell.tsx
│  ├─ ReviewStep.tsx
│  ├─ UploadModal.tsx
│  └─ WarrantyCard.tsx
├─ context
│  ├─ AuthContext.tsx
│  ├─ NotificationContext.tsx
│  ├─ RefreshContext.tsx
│  └─ ThemeContext.tsx
├─ eslint.config.js
├─ global.css
├─ metro.config.js
├─ nativewind-env.d.ts
├─ package-lock.json
├─ package.json
├─ README.md
├─ services
├─ tailwind.config.js
├─ tsconfig.json
├─ types
│  ├─ kit.types.ts
│  ├─ order.types.ts
│  ├─ StepMedia.ts
│  ├─ user.types.ts
│  └─ warranty.ts
└─ utils
   ├─ api.ts
   ├─ color.ts
   ├─ constants.ts
   ├─ downloadExcel.ts
   ├─ formatDate.ts
   ├─ locationUtils.ts
   ├─ mapCodeToCity.ts
   ├─ mediaUtils.ts
   ├─ statusColor.ts
   └─ taskUtils.ts

```
```
react-native-qr-scanner
├─ app
│  ├─ (adminDashboard)
│  │  ├─ index.tsx
│  │  ├─ manage-clients.tsx
│  │  ├─ manage-kits.tsx
│  │  ├─ manage-orders.tsx
│  │  ├─ review-claim-fulldetails.tsx
│  │  ├─ review-claim-update.tsx
│  │  ├─ review-req-dashboard.tsx
│  │  ├─ review-req-warranty-status.tsx
│  │  ├─ review-req-warranty.tsx
│  │  ├─ warranty-clients.tsx
│  │  ├─ warranty-orders.tsx
│  │  ├─ warranty-requests.tsx
│  │  └─ _layout.tsx
│  ├─ (auth)
│  │  ├─ forgot-password.tsx
│  │  ├─ login.tsx
│  │  ├─ register.tsx
│  │  └─ _layout.tsx
│  ├─ (main)
│  │  ├─ about.tsx
│  │  ├─ all-orders.tsx
│  │  ├─ dashboard
│  │  │  ├─ home.tsx
│  │  │  ├─ index.tsx
│  │  │  ├─ my-orders.tsx
│  │  │  ├─ my-scans.tsx
│  │  │  ├─ qr-scanner.tsx
│  │  │  └─ _layout.tsx
│  │  ├─ kit-details.tsx
│  │  ├─ notifications.tsx
│  │  ├─ order-details.tsx
│  │  ├─ product-info.tsx
│  │  ├─ profile.tsx
│  │  ├─ settings.tsx
│  │  ├─ support.tsx
│  │  ├─ test-upload.tsx
│  │  ├─ warranty
│  │  │  ├─ claim-form.tsx
│  │  │  ├─ claim-media-wizard.tsx
│  │  │  ├─ claim-steps.ts
│  │  │  ├─ index.tsx
│  │  │  ├─ my-cards.tsx
│  │  │  ├─ warranty-card.tsx
│  │  │  ├─ warranty-status-page.tsx
│  │  │  ├─ warranty-status.tsx
│  │  │  └─ _layout.tsx
│  │  └─ _layout.tsx
│  ├─ index.tsx
│  └─ _layout.tsx
├─ app.json
├─ assets
│  ├─ fonts
│  │  └─ SpaceMono-Regular.ttf
│  └─ images
│     ├─ adaptive-icon.png
│     ├─ app_icon.png
│     ├─ favicon.png
│     ├─ icon.png
│     ├─ partial-react-logo.png
│     ├─ react-logo.png
│     ├─ react-logo@2x.png
│     ├─ react-logo@3x.png
│     └─ splash-icon.png
├─ babel.config.js
├─ components
│  ├─ ChecklistStep.tsx
│  ├─ CustomAdminDrawer.tsx
│  ├─ CustomDrawer.tsx
│  ├─ FloatingInput.tsx
│  ├─ FloatingPicker.tsx
│  ├─ MediaStep.tsx
│  ├─ NotificationBell.tsx
│  ├─ ReviewStep.tsx
│  ├─ UploadModal.tsx
│  └─ WarrantyCard.tsx
├─ context
│  ├─ AuthContext.tsx
│  ├─ NotificationContext.tsx
│  ├─ RefreshContext.tsx
│  └─ ThemeContext.tsx
├─ eas.json
├─ eslint.config.js
├─ global.css
├─ metro.config.js
├─ nativewind-env.d.ts
├─ package-lock.json
├─ package.json
├─ README.md
├─ tailwind.config.js
├─ tsconfig.json
├─ types
│  ├─ kit.types.ts
│  ├─ order.types.ts
│  ├─ StepMedia.ts
│  ├─ user.types.ts
│  └─ warranty.ts
└─ utils
   ├─ api.ts
   ├─ color.ts
   ├─ constants.ts
   ├─ downloadExcel.ts
   ├─ formatDate.ts
   ├─ locationUtils.ts
   ├─ mapCodeToCity.ts
   ├─ mediaUtils.ts
   ├─ statusColor.ts
   └─ taskUtils.ts

```
```
react_qr_scanner
├─ app
│  ├─ (adminDashboard)
│  │  ├─ index.tsx
│  │  ├─ manage-clients.tsx
│  │  ├─ manage-kits.tsx
│  │  ├─ manage-orders.tsx
│  │  ├─ order-details.tsx
│  │  ├─ review-claim-fulldetails.tsx
│  │  ├─ review-claim-update.tsx
│  │  ├─ review-req-dashboard.tsx
│  │  ├─ review-req-warranty-status.tsx
│  │  ├─ review-req-warranty.tsx
│  │  ├─ warranty-clients.tsx
│  │  ├─ warranty-orders.tsx
│  │  ├─ warranty-requests.tsx
│  │  └─ _layout.tsx
│  ├─ (auth)
│  │  ├─ forgot-password.tsx
│  │  ├─ login.tsx
│  │  ├─ register.tsx
│  │  └─ _layout.tsx
│  ├─ (main)
│  │  ├─ about.tsx
│  │  ├─ all-orders.tsx
│  │  ├─ dashboard
│  │  │  ├─ home.tsx
│  │  │  ├─ index.tsx
│  │  │  ├─ my-orders.tsx
│  │  │  ├─ my-scans.tsx
│  │  │  ├─ qr-scanner.tsx
│  │  │  └─ _layout.tsx
│  │  ├─ kit-details.tsx
│  │  ├─ notifications.tsx
│  │  ├─ order-details.tsx
│  │  ├─ product-info.tsx
│  │  ├─ profile.tsx
│  │  ├─ settings.tsx
│  │  ├─ support.tsx
│  │  ├─ test-upload.tsx
│  │  ├─ warranty
│  │  │  ├─ claim-form.tsx
│  │  │  ├─ claim-media-wizard.tsx
│  │  │  ├─ claim-steps.ts
│  │  │  ├─ index.tsx
│  │  │  ├─ my-cards.tsx
│  │  │  ├─ warranty-card.tsx
│  │  │  ├─ warranty-status-page.tsx
│  │  │  ├─ warranty-status.tsx
│  │  │  └─ _layout.tsx
│  │  └─ _layout.tsx
│  ├─ index.tsx
│  └─ _layout.tsx
├─ app.json
├─ assets
│  ├─ fonts
│  │  └─ SpaceMono-Regular.ttf
│  └─ images
│     ├─ adaptive-icon.png
│     ├─ app_icon.png
│     ├─ favicon.png
│     ├─ icon.png
│     ├─ partial-react-logo.png
│     ├─ react-logo.png
│     ├─ react-logo@2x.png
│     ├─ react-logo@3x.png
│     └─ splash-icon.png
├─ babel.config.js
├─ components
│  ├─ AdminOrderCard.tsx
│  ├─ ChecklistStep.tsx
│  ├─ CustomAdminDrawer.tsx
│  ├─ CustomDrawer.tsx
│  ├─ FilterSortBar.tsx
│  ├─ FloatingInput.tsx
│  ├─ FloatingPicker.tsx
│  ├─ MediaStep.tsx
│  ├─ NotificationBell.tsx
│  ├─ ReviewStep.tsx
│  ├─ UploadModal.tsx
│  └─ WarrantyCard.tsx
├─ context
│  ├─ AuthContext.tsx
│  ├─ NotificationContext.tsx
│  ├─ RefreshContext.tsx
│  └─ ThemeContext.tsx
├─ eas.json
├─ eslint.config.js
├─ global.css
├─ metro.config.js
├─ nativewind-env.d.ts
├─ package-lock.json
├─ package.json
├─ README.md
├─ services
├─ tailwind.config.js
├─ tsconfig.json
├─ types
│  ├─ adminOrder.types.ts
│  ├─ kit.types.ts
│  ├─ order.types.ts
│  ├─ StepMedia.ts
│  ├─ user.types.ts
│  └─ warranty.ts
└─ utils
   ├─ api.ts
   ├─ color.ts
   ├─ constants.ts
   ├─ downloadExcel.ts
   ├─ formatDate.ts
   ├─ locationUtils.ts
   ├─ mapCodeToCity.ts
   ├─ mediaUtils.ts
   ├─ statusColor.ts
   └─ taskUtils.ts

```