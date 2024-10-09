import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PrivacyPolicyPopup() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-base text-primary">
          Политикой конфиденциальности
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-[800px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Политика конфиденциальности</DialogTitle>
          <DialogDescription>
            Пожалуйста, ознакомьтесь с политикой конфиденциальности
          </DialogDescription>
        </DialogHeader>
        <iframe
          src="/privacy-policy/policy.html"
          className="mt-4 h-96 w-full"
          title="Privacy Policy"
        />
      </DialogContent>
    </Dialog>
  );
}
