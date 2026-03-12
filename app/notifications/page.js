import { getNotifications } from "@/lib/dataStore";
import NotificationCard from "@/components/NotificationCard";

export const metadata = {
  title: "Notifications | Students' Senate IIEST Shibpur",
};

// group notifications by year-month for a clean timeline display
function groupByMonth(notifications) {
  return notifications.reduce((acc, n) => {
    const d = new Date(n.date);
    const key = isNaN(d)
      ? "Other"
      : d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
    if (!acc[key]) acc[key] = [];
    acc[key].push(n);
    return acc;
  }, {});
}

export default async function NotificationsPage() {
  const notifications = (await getNotifications()).sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
  
  const grouped = groupByMonth(notifications);
  const months = Object.keys(grouped);

  return (
    <div className="pt-20 bg-cream min-h-screen">
      {/* page header */}
      <section className="relative py-24 px-6 md:px-12 lg:px-20 bg-primary border-b-8 border-primary-dark shadow-[0_12px_0_0_#111]">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_#fff_2px,_transparent_2px)] bg-[size:32px_32px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-block text-xs font-display font-black tracking-widest uppercase bg-accent text-primary px-4 py-2 mb-8 border-4 border-primary shadow-[4px_4px_0_0_#111] -rotate-2">
            Official Notice Board
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-cream leading-none tracking-tighter uppercase drop-shadow-[4px_4px_0_#111]">
            Notifications
          </h1>
          <div className="w-full max-w-2xl mx-auto mt-8 border-t-4 border-dashed border-cream/30 pt-6">
            <p className="font-body text-cream/90 text-sm md:text-base uppercase tracking-widest font-bold mb-4">
              Announcements & Updates &mdash; Students&apos; Senate, IIEST Shibpur
            </p>
            <p className="font-display font-black text-accent text-lg bg-primary inline-block px-4 py-1 border-2 border-accent">
              {notifications.length} Total Record{notifications.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </section>

      {/* notifications listing */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          {notifications.length === 0 && (
            <div className="bg-cream border-4 border-primary p-16 text-center shadow-[16px_16px_0_0_#111]">
              <p className="font-display text-4xl text-primary font-black uppercase tracking-tighter">
                No active notices
              </p>
            </div>
          )}

          {months.map((month) => (
            <div key={month} className="mb-20">
              {/* month label */}
              <div className="flex items-center gap-6 mb-12">
                <div className="font-display text-xl md:text-2xl font-black uppercase tracking-widest text-primary bg-secondary px-6 py-2 border-4 border-primary shadow-[4px_4px_0_0_#111]">
                  {month}
                </div>
                <div className="flex-1 h-2 bg-primary" />
              </div>

              {/* notices for this month */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {grouped[month].map((n) => (
                  <div key={n.id} id={`notice-${n.id}`} className="h-full">
                    <NotificationCard notification={n} showFull={true} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
