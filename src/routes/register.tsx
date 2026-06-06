import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Logo } from "@/components/Logo";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({ component: Register });

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      toast.success("Account created");
      setTimeout(() => navigate({ to: "/dashboard" }), 1200);
    }, 800);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/40 p-6">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex items-center justify-center"><Logo /></div>
        <div className="bg-card border rounded-xl shadow-sm p-6 md:p-8">
          {done ? (
            <div className="text-center py-10">
              <div className="mx-auto h-14 w-14 rounded-full bg-success/15 grid place-items-center mb-4">
                <CheckCircle2 className="h-7 w-7 text-success" />
              </div>
              <h2 className="text-xl font-semibold">Account created</h2>
              <p className="text-sm text-muted-foreground mt-1">Redirecting you to your workspace…</p>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-semibold tracking-tight">Create your workspace</h1>
              <p className="text-sm text-muted-foreground mt-1">Get started in less than a minute. No credit card required.</p>
              <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-1.5"><Label>First name</Label><Input required defaultValue="Arjun" /></div>
                <div className="space-y-1.5"><Label>Last name</Label><Input required defaultValue="Mehra" /></div>
                <div className="space-y-1.5"><Label>Email address</Label><Input type="email" required defaultValue="arjun@acme.co" /></div>
                <div className="space-y-1.5"><Label>Phone number</Label><Input type="tel" required defaultValue="+91 98200 33445" /></div>
                <div className="space-y-1.5">
                  <Label>Role</Label>
                  <Select defaultValue="manager">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manager">Procurement Manager</SelectItem>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="approver">Approver / Finance</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Country</Label>
                  <Select defaultValue="IN">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IN">India</SelectItem>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="GB">United Kingdom</SelectItem>
                      <SelectItem value="DE">Germany</SelectItem>
                      <SelectItem value="SG">Singapore</SelectItem>
                      <SelectItem value="AE">United Arab Emirates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <Label>Additional information</Label>
                  <Textarea rows={3} placeholder="Company name, expected spend, or anything else we should know…" />
                </div>
                <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 pt-2">
                  <Button type="submit" className="flex-1 h-10" disabled={loading}>
                    {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Creating account…</> : "Register"}
                  </Button>
                  <Button asChild variant="outline" className="flex-1 h-10"><Link to="/login">Back to login</Link></Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
