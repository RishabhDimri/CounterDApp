# Internet Computer Counter DApp

A decentralized counter application built on the Internet Computer blockchain using Rust (for the backend canister) and React (for the frontend). This project demonstrates a simple yet functional way to interact with the Internet Computer blockchain.

## 🚀 Features

- Decentralized counter functionality
- Real-time updates
- Responsive and modern UI
- Secure blockchain interactions
- Share counter state via URL
- Error handling and loading states

## 🛠️ Tech Stack

- **Backend:**
  - Rust
  - Internet Computer SDK
  - Candid interface description language

- **Frontend:**
  - React
  - Styled Components
  - Framer Motion
  - React Icons


## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/RishabhDimri/CounterDApp.git
cd CounterDApp
```

2. Install DFX (if not already installed):
```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

3. Start the local Internet Computer:
```bash
dfx start --background
```

4. Install frontend dependencies:
```bash
cd src/counter_project_frontend
npm install
```

5. Deploy the canisters:
```bash
dfx deploy
```

## 💻 Development

1. Start the development server:
```bash
npm start
```

2. Build the project:
```bash
dfx build
```

3. Deploy locally:
```bash
dfx deploy
```

## 📝 Project Structure

```
ic-counter/
├── dfx.json
├── README.md
├── src/
│   ├── counter_project_backend/
│   │   ├── Cargo.toml
│   │   └── src/
│   │       └── lib.rs
│   └── counter_project_frontend/
│       ├── package.json
│       └── src/
│           ├── App.jsx
│           └── index.html
└── canister_ids.json
```

## 🔄 Smart Contract Methods

The Rust canister exposes the following methods:

```
service : {
  increment: () -> ();
  decrement: () -> ();
  get_value: () -> (int32) query;
}

```

