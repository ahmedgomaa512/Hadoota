import { Bell, Globe2, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import Chip from '../components/Chip';
import Page from '../components/Page';
import PriceTag from '../components/PriceTag';
import { pastOrders } from '../data/products';

export default function Profile() {
  const [language, setLanguage] = useState('EN');

  return (
    <Page>
      <header className="rounded-[8px] border border-light-gray bg-white p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-parchment-cream text-story-pink-dark">
            <User size={30} />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-bold leading-8 text-ink">Mona Hassan</h1>
            <p className="text-sm text-gray">Parent profile</p>
          </div>
        </div>
      </header>

      <section className="mt-5 rounded-[8px] border border-light-gray bg-white p-4">
        <h2 className="font-heading text-2xl font-bold text-ink">Order history</h2>
        <div className="mt-3 divide-y divide-light-gray">
          {pastOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between gap-3 py-3">
              <div>
                <p className="font-semibold text-ink">Order {order.id}</p>
                <p className="text-sm text-gray">{order.date} · {order.status}</p>
              </div>
              <PriceTag value={order.total} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 rounded-[8px] border border-light-gray bg-white p-4">
        <h2 className="font-heading text-2xl font-bold text-ink">Settings</h2>
        <div className="mt-3 space-y-3">
          <div className="flex items-center justify-between gap-3 rounded-[8px] bg-parchment-cream p-3">
            <div className="flex items-center gap-3 text-ink">
              <Globe2 size={20} />
              <span className="font-semibold">Language</span>
            </div>
            <div className="flex gap-2">
              {['EN', 'AR'].map((item) => (
                <Chip key={item} selected={language === item} onClick={() => setLanguage(item)} className="h-9 px-3">
                  {item}
                </Chip>
              ))}
            </div>
          </div>
          <Setting icon={Bell} label="Notifications" value="On" />
          <Setting icon={LogOut} label="Logout" value="Visual only" />
        </div>
      </section>
    </Page>
  );
}

function Setting({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[8px] bg-parchment-cream p-3">
      <div className="flex items-center gap-3 text-ink">
        <Icon size={20} />
        <span className="font-semibold">{label}</span>
      </div>
      <span className="text-sm text-gray">{value}</span>
    </div>
  );
}
