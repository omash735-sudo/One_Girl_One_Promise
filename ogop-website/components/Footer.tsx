import { Heart } from "lucide-react";

interface ContactContent {
  address?: string;
  phone?: string;
  email?: string;
}

export default function Footer({ contact }: { contact: ContactContent }) {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-xs">OG</div>
              <div>
                <div className="text-white font-bold font-display">OGOP</div>
                <div className="text-yellow-400 text-xs">Yes, I Can Become</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed">One Girl One Promise — restoring hope and opportunity to teenage mothers in Malawi.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm">
              {["About", "Mission", "Programs", "Impact", "Contact"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-yellow-400 transition">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-2 text-sm">
              {contact.address && <span>{contact.address}</span>}
              {contact.phone && <span>{contact.phone}</span>}
              {contact.email && <a href={`mailto:${contact.email}`} className="hover:text-yellow-400 transition">{contact.email}</a>}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© {new Date().getFullYear()} One Girl One Promise. All rights reserved.</p>
          <p className="text-sm flex items-center gap-1.5">Made with <Heart size={13} className="text-red-500" /> for the girls of Malawi</p>
        </div>
      </div>
    </footer>
  );
}
