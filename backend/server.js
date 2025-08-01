const cluster =require('cluster');
const os =require('os');
const process=require('process');

const numCPUs=os.cpus().length;
if(cluster.isPrimary){
  console.log(`======================================`);
  console.log(`Civix Backend Primary Process Started`);
  console.log(`Primary PID:${process.pid}`);
  console.log(`=======================================`);
  console.log(`Forking server for ${numCPUs} CPU Cores...`);

  for(let i=0;i<numCPUs;i++){
    cluster.fork();
  }

  cluster.on('online',(worker)=>{
    console.log(`Worker ${worker.process.pid} is online`);
  });


  cluster.on('exit', (worker, code, signal) => {
    console.error(`Worker ${worker.process.pid} died. Code: ${code}, Signal: ${signal}`);
    if (worker.exitedAfterDisconnect === true) {
      console.log(`Worker ${worker.process.pid} exited shutting down gracefully.`);
    } else {
      console.log(`Worker ${worker.process.pid} exited unexpectedly. Restarting...`);
      cluster.fork();
    }
  });
}


else {

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const path = require("path");
require("dotenv").config();

const app = express();

// === Database Initialization ===

// Commented db.js import so that the app can run on MongoDB only to rectify the issue of multiple database connections

// require("./config/db.js");     // PostgreSQL
 require("./config/mongo.js");  // MongoDB

// === Swagger Docs ===
const { swaggerUi, specs } = require("./config/swagger.js");

// === Middlewares ===
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://civix-phi.vercel.app/login",
    "https://civix-phi.vercel.app/signup",
  ],
  credentials: true,
}));

// === Security Headers Configuration ===
app.use(helmet({
  // Content Security Policy - More permissive to avoid common CSP errors
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https:", "data:", "blob:"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:", "data:"],
      fontSrc: ["'self'", "https:", "data:"],
      imgSrc: ["'self'", "https:", "data:", "blob:"],
      connectSrc: ["'self'", "https:", "wss:", "ws:"],
      frameSrc: ["'self'", "https:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'", "https:", "data:", "blob:"],
      workerSrc: ["'self'", "blob:", "data:"],
      childSrc: ["'self'", "blob:", "data:"],
      formAction: ["'self'", "https:"],
    },
  },

  // X-Frame-Options - Prevent clickjacking
  frameguard: {
    action: 'sameorigin'
  },

  // X-Content-Type-Options - Prevent MIME sniffing
  noSniff: true,

  // Referrer Policy - Control referrer information
  referrerPolicy: {
    policy: ["strict-origin-when-cross-origin"]
  },

  // X-DNS-Prefetch-Control
  dnsPrefetchControl: {
    allow: false
  },

  // Hide X-Powered-By header
  hidePoweredBy: true,

  // HSTS (HTTP Strict Transport Security) - only in production
  hsts: process.env.NODE_ENV === 'production' ? {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  } : false,
}));

// === Permissions Policy Header ===
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy',
    'camera=(), ' +
    'microphone=(), ' +
    'geolocation=(self), ' +
    'gyroscope=(), ' +
    'magnetometer=(), ' +
    'payment=(), ' +
    'usb=(), ' +
    'interest-cohort=()'
  );
  next();
});

// === Additional Security Headers ===
app.use((req, res, next) => {
  // X-Content-Type-Options (additional explicit setting)
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // X-Frame-Options (additional explicit setting)
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // Referrer-Policy (additional explicit setting)
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // X-XSS-Protection (legacy but still useful)
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Cross-Origin-Embedder-Policy
  res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');

  // Cross-Origin-Opener-Policy
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');

  // Cross-Origin-Resource-Policy
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// === Rate Limiting ===
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// === Routes ===
const authRoutes = require("./routes/auth.js");
const issueRoutes = require("./routes/issues.js");
const profileRoutes = require("./routes/profileRoutes.js");
const contributionsRoutes = require("./routes/contributions.js")


app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/contributors", contributionsRoutes)


// === Swagger API Docs ===
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// === Global Error Handler ===
const errorHandler = require("./middlewares/errorHandler.js");
app.use(errorHandler);

// === Start Server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

}
