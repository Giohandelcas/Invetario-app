import { LogOut } from "lucide-react";

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ROLE_LABELS } from "@/lib/roles";
import { logoutAction } from "@/lib/auth/actions";
import type { Role } from "@/types/api";

export function NavUser({
  userName,
  role,
}: {
  userName: string;
  role: Role;
}) {
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem className="flex items-center gap-2 px-2 py-1.5">
          <Avatar className="size-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col text-sm leading-tight">
            <span className="truncate font-medium">{userName}</span>
            <span className="truncate text-xs text-muted-foreground">
              {ROLE_LABELS[role]}
            </span>
          </div>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <form action={logoutAction}>
            <SidebarMenuButton type="submit" tooltip="Cerrar sesión">
              <LogOut />
              <span>Cerrar sesión</span>
            </SidebarMenuButton>
          </form>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
