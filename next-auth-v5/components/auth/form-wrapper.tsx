import { ReactNode } from "react";
import AuthCard from "@/components/auth/card";
import AuthCardSidebar from "@/components/auth/card/card-sidebar";
import AuthCardContent from "@/components/auth/card/card-content";
import SocialButtons from "@/components/auth/card/social-buttons";
import Link from "next/link";

export default function FormWrapper({
  title,
  subTitle,
  backButtonLabel,
  backButtonHref,
  showSocial = true,
  children,
}: {
  title: string;
  subTitle: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  children: ReactNode;
}) {
  return (
    <AuthCard>
      <AuthCardSidebar>{subTitle}</AuthCardSidebar>

      <AuthCardContent title={title}>
        {children}

        {showSocial && <SocialButtons />}

        <button className="btn btn-link">
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </button>
      </AuthCardContent>
    </AuthCard>
  );
}
