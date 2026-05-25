import { useState, useRef, useEffect } from "react";
import { Bell, User, CheckCircle2, ShoppingBag, AlertTriangle } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";
import type { AdminPage } from "../types";

interface AdminLayoutProps {
  currentPage: AdminPage;
  onNavigate: (page: AdminPage) => void;
  onLogout: () => void;
  title: string;
  subtitle: string;
  notifCount?: number;
  children: React.ReactNode;
}

const MOCK_NOTIFICATIONS = [
  { id: 1, type: "order", title: "Pesanan Baru #1029", desc: "Peyek Kacang Original (2x) - Rp 50.000", time: "Baru saja", unread: true },
  { id: 2, type: "payment", title: "Pembayaran Dikonfirmasi", desc: "Pesanan #1028 telah dibayar", time: "15 mnt lalu", unread: true },
  { id: 3, type: "alert", title: "Peringatan Stok", desc: "Peyek Bayam Crispy sisa 5 unit", time: "1 jam lalu", unread: false },
  { id: 4, type: "order", title: "Pesanan Selesai #1025", desc: "Paket telah diterima pelanggan", time: "Kemarin", unread: false },
];

export function AdminLayout({
  currentPage, onNavigate, onLogout,
  title, subtitle, children,
}: AdminLayoutProps) {
  const [showNotif, setShowNotif] = useState(false);
  const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS);
  const notifRef = useRef<HTMLDivElement>(null);
  
  const unreadCount = notifs.filter(n => n.unread).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotif(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, unread: false })));
  };
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#FDFBF7", fontFamily: "'Space Grotesk', sans-serif" }}>
      <AdminSidebar currentPage={currentPage} onNavigate={onNavigate} onLogout={onLogout} />

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top Bar */}
        <header style={{
          backgroundColor: "#FDFBF7",
          borderBottom: "3px solid #000",
          padding: "16px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}>
          <div>
            <h1 style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "2.4rem",
              letterSpacing: "-0.03em",
              color: "#000",
              lineHeight: 1,
              textTransform: "uppercase",
            }}>
              {title}
            </h1>
            <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#666", marginTop: "4px" }}>{subtitle}</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Notification */}
            <div ref={notifRef} style={{ position: "relative" }}>
              <button 
                onClick={() => setShowNotif(!showNotif)}
                style={{
                  position: "relative",
                  width: "44px", height: "44px",
                  border: "3px solid #000",
                  backgroundColor: showNotif ? "#FFE000" : "#FDFBF7",
                  boxShadow: showNotif ? "1px 1px 0px #000" : "3px 3px 0px #000",
                  transform: showNotif ? "translate(2px, 2px)" : "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.1s",
                  zIndex: 50,
                }}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span style={{
                    position: "absolute", top: "-8px", right: "-8px",
                    backgroundColor: "#FF8C00", border: "2px solid #000",
                    borderRadius: "50%", width: "20px", height: "20px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.65rem", fontWeight: 800, color: "#000",
                  }}>
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotif && (
                <div style={{
                  position: "absolute",
                  top: "100%", right: 0,
                  marginTop: "16px",
                  width: "340px",
                  backgroundColor: "#fff",
                  border: "4px solid #000",
                  boxShadow: "8px 8px 0px #000",
                  zIndex: 100,
                  display: "flex", flexDirection: "column",
                }}>
                  <div style={{ 
                    padding: "14px 20px", 
                    backgroundColor: "#000",
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}>
                    <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.95rem", color: "#FFE000", margin: 0, letterSpacing: "0.05em" }}>
                      NOTIFIKASI
                    </h3>
                    <button 
                      onClick={markAllRead}
                      style={{ 
                        background: "none", border: "none", 
                        color: "#FF8C00", fontSize: "0.7rem", fontWeight: 700, 
                        cursor: "pointer", textDecoration: "underline" 
                      }}
                    >
                      Tandai semua dibaca
                    </button>
                  </div>
                  
                  <div style={{ maxHeight: "380px", overflowY: "auto", padding: "12px" }}>
                    {notifs.map((n) => (
                      <div 
                        key={n.id} 
                        onClick={() => {
                          setNotifs(notifs.map(x => x.id === n.id ? { ...x, unread: false } : x));
                          setShowNotif(false);
                          if (n.type === 'order' || n.type === 'payment') {
                            onNavigate('pesanan');
                          } else if (n.type === 'alert') {
                            onNavigate('inventaris');
                          }
                        }}
                        style={{
                          padding: "14px",
                          border: "3px solid #000",
                          marginBottom: "10px",
                          backgroundColor: n.unread ? "#FDFBF7" : "#f5f5f5",
                          boxShadow: n.unread ? "4px 4px 0px #FF8C00" : "none",
                          transform: n.unread ? "translate(-2px, -2px)" : "none",
                          position: "relative",
                          transition: "all 0.2s",
                          cursor: "pointer"
                        }}
                      >
                        {n.unread && (
                          <div style={{ position: "absolute", top: "12px", right: "12px", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#FF8C00", border: "1px solid #000" }} />
                        )}
                        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                          <div style={{ 
                            width: "32px", height: "32px", 
                            backgroundColor: n.type === 'order' ? '#FFE000' : n.type === 'payment' ? '#00E676' : '#FFB3B3',
                            border: "2px solid #000", display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0
                          }}>
                            {n.type === 'order' && <ShoppingBag size={14} color="#000" />}
                            {n.type === 'payment' && <CheckCircle2 size={14} color="#000" />}
                            {n.type === 'alert' && <AlertTriangle size={14} color="#000" />}
                          </div>
                          <div>
                            <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "0.8rem", color: "#000", marginBottom: "4px", paddingRight: "16px", lineHeight: 1.2 }}>{n.title}</p>
                            <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#555", marginBottom: "6px", lineHeight: 1.3 }}>{n.desc}</p>
                            <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#888" }}>{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button style={{
                    padding: "14px", backgroundColor: "#FDFBF7", borderTop: "3px solid #000", border: "none", borderTopWidth: "3px", borderTopStyle: "solid", borderTopColor: "#000",
                    fontFamily: "'Archivo Black', sans-serif", fontSize: "0.8rem", color: "#000", cursor: "pointer", width: "100%", transition: "background 0.2s"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#FFE000"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#FDFBF7"}
                  >
                    LIHAT SEMUA NOTIFIKASI
                  </button>
                </div>
              )}
            </div>

            {/* Admin Badge */}
            <button style={{
              display: "flex", alignItems: "center", gap: "8px",
              backgroundColor: "#000", border: "3px solid #000",
              boxShadow: "4px 4px 0px #FF8C00",
              padding: "10px 18px",
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: "0.85rem", letterSpacing: "0.08em",
              color: "#fff", cursor: "pointer",
            }}>
              <User size={16} color="#FF8C00" />
              ADMIN
            </button>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: "32px 36px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
