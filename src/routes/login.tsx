import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/Logo";
import { Loader2, ShieldCheck, BarChart3, Workflow } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("priya@vendorbridge.io");
  const [password, setPassword] = useState("demo1234");
  const [err, setErr] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!email || !password) { setErr("Please fill in all fields."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Welcome back, Priya");
      navigate({ to: "/dashboard" });
    }, 700);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-primary via-primary to-info p-12 text-primary-foreground flex-col justify-between">
        <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-[480px] h-[480px] rounded-full bg-black/20 blur-3xl" />
        <div className="relative">
          <Logo />
        </div>
        <div className="relative space-y-6 max-w-md">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight">The procurement OS for modern enterprises.</h2>
          <p className="text-primary-foreground/80 text-[15px] leading-relaxed">From RFQ to invoice, run your entire vendor lifecycle in one auditable, real-time platform.</p>
          <div className="grid gap-3 pt-2">
            {[
              { icon: Workflow, t: "Streamlined RFQ → PO workflows" },
              { icon: BarChart3, t: "Real-time spend analytics" },
              { icon: ShieldCheck, t: "Compliance-grade audit trail" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="h-9 w-9 rounded-lg bg-white/15 grid place-items-center"><f.icon className="h-4 w-4" /></div>
                {f.t}
              </div>
            ))}
          </div>
        </div>
        <div className="relative text-xs text-primary-foreground/70">© 2026 VendorBridge · SOC 2 Type II</div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo /></div>
          <h1 className="text-3xl font-semibold tracking-tight">Sign in to VendorBridge</h1>
          <p className="text-sm text-muted-foreground mt-2">Enter your credentials to access your procurement workspace.</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a className="text-xs text-primary hover:underline" href="#">Forgot password?</a>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" defaultChecked />
              <Label htmlFor="remember" className="text-sm font-normal">Remember me for 30 days</Label>
            </div>
            {err && <div className="text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2">{err}</div>}
            <Button type="submit" className="w-full h-10" disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Signing in…</> : "Sign in"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            New to VendorBridge? <Link to="/register" className="text-primary font-medium hover:underline">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
