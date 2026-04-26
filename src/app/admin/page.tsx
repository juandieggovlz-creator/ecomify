"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  DollarSign, 
  Package, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Phone,
  MapPin,
  RefreshCcw,
  Trash2,
  AlertTriangle,
  ShieldCheck
} from "lucide-react";

type Order = {
  id: string;
  orderNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  department: string;
  city: string;
  address: string;
  total: number;
  status: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "warn" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" | "warn" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchOrders = async (searchTerm = "") => {
    try {
      const res = await fetch(`/api/admin/orders?search=${encodeURIComponent(searchTerm)}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => fetchOrders(search), 500);
    return () => clearTimeout(delay);
  }, [search]);

  const updateStatus = async (id: string, newStatus: string) => {
    setIsUpdating(id);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
        showToast("✅ Estado actualizado correctamente");
      } else {
        showToast("Error al actualizar el estado", "error");
      }
    } catch {
      showToast("Error de conexión", "error");
    } finally {
      setIsUpdating(null);
    }
  };

  const deleteOrder = async (id: string, orderNumber: string) => {
    if (!confirm(`¿Eliminar pedido #${orderNumber}? Esta acción no se puede deshacer.`)) return;
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, { method: "DELETE" });
      if (res.ok) {
        setOrders(orders.filter(o => o.id !== id));
        showToast(`🗑️ Pedido #${orderNumber} eliminado`, "warn");
      } else {
        showToast("Error al eliminar el pedido", "error");
      }
    } catch {
      showToast("Error de conexión", "error");
    } finally {
      setIsDeleting(null);
    }
  };

  const totalEarnings = orders
    .filter(o => o.status === "DELIVERED")
    .reduce((sum, o) => sum + o.total, 0);

  const pendingCount = orders.filter(o => o.status === "PENDING").length;
  const deliveredCount = orders.filter(o => o.status === "DELIVERED").length;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(amount);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium border border-green-500/20 flex items-center gap-1 w-fit"><CheckCircle2 className="w-3 h-3"/>Entregado</span>;
      case "CANCELED":
        return <span className="px-2 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-medium border border-red-500/20 flex items-center gap-1 w-fit"><XCircle className="w-3 h-3"/>Cancelado</span>;
      default:
        return <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-xs font-medium border border-yellow-500/20 flex items-center gap-1 w-fit"><Clock className="w-3 h-3"/>Pendiente</span>;
    }
  };

  return (
    <div className="space-y-8">

      {/* Toast de sistema */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-semibold transition-all animate-fade-in
          ${toast.type === "success" ? "bg-neutral-900 border-green-500/40 text-green-400" :
            toast.type === "warn" ? "bg-neutral-900 border-orange-500/40 text-orange-400" :
            "bg-neutral-900 border-red-500/40 text-red-400"}`}>
          {toast.type === "success" ? <ShieldCheck className="w-4 h-4" /> :
           toast.type === "warn" ? <AlertTriangle className="w-4 h-4" /> :
           <XCircle className="w-4 h-4" />}
          <span>{toast.msg}</span>
          <span className="text-[10px] text-neutral-500 ml-2">— Sistema Ecomify</span>
        </div>
      )}

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20 text-orange-500">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-neutral-400">Ganancias (Entregados)</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(totalEarnings)}</p>
          </div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-500">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-neutral-400">Total Pedidos</p>
            <p className="text-2xl font-bold text-white">{orders.length}</p>
          </div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 text-yellow-500">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-neutral-400">Pendientes</p>
            <p className="text-2xl font-bold text-white">{pendingCount}</p>
          </div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20 text-green-500">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-neutral-400">Completados</p>
            <p className="text-2xl font-bold text-white">{deliveredCount}</p>
          </div>
        </div>
      </div>

      {/* Búsqueda */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-white">Registro de Pedidos</h2>
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, teléfono o # pedido..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 text-white rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-neutral-500"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-900/50 border-b border-neutral-800">
                <th className="p-4 text-sm font-semibold text-neutral-400">Pedido</th>
                <th className="p-4 text-sm font-semibold text-neutral-400">Cliente</th>
                <th className="p-4 text-sm font-semibold text-neutral-400">Ubicación</th>
                <th className="p-4 text-sm font-semibold text-neutral-400">Total</th>
                <th className="p-4 text-sm font-semibold text-neutral-400">Estado</th>
                <th className="p-4 text-sm font-semibold text-neutral-400">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-neutral-500">
                    <RefreshCcw className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Cargando información segura...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-neutral-500">
                    No se encontraron pedidos con ese filtro.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className={`border-b border-neutral-800/50 hover:bg-neutral-800/30 transition-colors ${isDeleting === order.id ? "opacity-40" : ""}`}>
                    <td className="p-4">
                      <span className="font-mono text-sm text-neutral-300">#{order.orderNumber}</span>
                      <p className="text-xs text-neutral-500 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium text-white">{order.firstName} {order.lastName}</p>
                      <div className="flex items-center gap-1 text-xs text-neutral-400 mt-1">
                        <Phone className="w-3 h-3" />
                        {order.phone}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-neutral-300">{order.city}, {order.department}</p>
                      <div className="flex items-center gap-1 text-xs text-neutral-400 mt-1 truncate max-w-[200px]" title={order.address}>
                        <MapPin className="w-3 h-3" />
                        {order.address}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-white">{formatCurrency(order.total)}</td>
                    <td className="p-4">{getStatusBadge(order.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          disabled={isUpdating === order.id || isDeleting === order.id}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className="bg-neutral-800 border border-neutral-700 text-white text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-orange-500 disabled:opacity-50"
                        >
                          <option value="PENDING">Pendiente</option>
                          <option value="DELIVERED">Entregado</option>
                          <option value="CANCELED">Cancelado</option>
                        </select>

                        {isUpdating === order.id && <RefreshCcw className="w-4 h-4 text-orange-500 animate-spin" />}

                        <button
                          onClick={() => deleteOrder(order.id, order.orderNumber)}
                          disabled={isDeleting === order.id || isUpdating === order.id}
                          title="Eliminar reserva"
                          className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all disabled:opacity-40"
                        >
                          {isDeleting === order.id
                            ? <RefreshCcw className="w-3.5 h-3.5 animate-spin" />
                            : <Trash2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
