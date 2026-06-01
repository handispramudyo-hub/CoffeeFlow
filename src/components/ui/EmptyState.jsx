import { Inbox } from "lucide-react";

export default function EmptyState({ icon: Icon = Inbox, title = "No data", description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-coffee-100 flex items-center justify-center mb-4">
        <Icon size={28} className="text-coffee-400" />
      </div>
      <h3 className="text-lg font-semibold text-coffee-700">{title}</h3>
      {description && <p className="text-sm text-coffee-400 mt-1 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
