export const vendors = [
  { id: "V-1042", name: "Steelworks India Pvt Ltd", category: "Raw Materials", gst: "27AABCS1234A1Z5", contact: "Rajesh Kumar", email: "rajesh@steelworks.in", phone: "+91 98200 11223", status: "Active" as const, rating: 4.8 },
  { id: "V-1043", name: "Nordic Components AB", category: "Electronics", gst: "SE556789012301", contact: "Anna Lindqvist", email: "anna@nordic-comp.se", phone: "+46 8 555 0123", status: "Active" as const, rating: 4.6 },
  { id: "V-1044", name: "Pacific Logistics Co.", category: "Logistics", gst: "29AAFCP9876B2Z1", contact: "Linda Park", email: "lpark@pacificlog.com", phone: "+1 415 555 0188", status: "Pending" as const, rating: 4.2 },
  { id: "V-1045", name: "Bharat Office Supplies", category: "Office Supplies", gst: "07AAACB5678C1Z3", contact: "Anil Mehta", email: "anil@bharatoffice.in", phone: "+91 11 4567 8900", status: "Active" as const, rating: 4.3 },
  { id: "V-1046", name: "Apex Industrial Tools", category: "Tools & Equipment", gst: "33AAACA1234D1Z9", contact: "Karthik R.", email: "karthik@apextools.com", phone: "+91 44 2233 4455", status: "Suspended" as const, rating: 3.1 },
  { id: "V-1047", name: "GreenLeaf Packaging", category: "Packaging", gst: "19AABCG7654E1Z7", contact: "Sneha Roy", email: "sneha@greenleafpkg.in", phone: "+91 33 8877 6655", status: "Active" as const, rating: 4.5 },
  { id: "V-1048", name: "Quantum Software Labs", category: "IT Services", gst: "29AAQCS8989F2Z2", contact: "Vikram Iyer", email: "vikram@quantumlabs.io", phone: "+91 80 4422 9988", status: "Active" as const, rating: 4.9 },
  { id: "V-1049", name: "Mediterra Chemicals", category: "Chemicals", gst: "IT09876543210", contact: "Marco Bianchi", email: "marco@mediterra.it", phone: "+39 02 4567 890", status: "Pending" as const, rating: 4.0 },
];

export const rfqs = [
  { id: "RFQ-2026-0421", title: "CNC Machining Spare Parts - Q2", category: "Raw Materials", priority: "High" as const, status: "Open" as const, deadline: "2026-06-18", vendors: 6, quotes: 4, value: 184500 },
  { id: "RFQ-2026-0420", title: "Office Laptops Refresh (40 units)", category: "IT Services", priority: "Medium" as const, status: "Closed" as const, deadline: "2026-06-12", vendors: 4, quotes: 4, value: 96000 },
  { id: "RFQ-2026-0419", title: "Warehouse Pallet Racking System", category: "Tools & Equipment", priority: "High" as const, status: "Open" as const, deadline: "2026-06-22", vendors: 5, quotes: 2, value: 62000 },
  { id: "RFQ-2026-0418", title: "Corrugated Packaging - Annual Supply", category: "Packaging", priority: "Low" as const, status: "Awarded" as const, deadline: "2026-06-05", vendors: 7, quotes: 6, value: 41200 },
  { id: "RFQ-2026-0417", title: "Industrial Coolant 50,000L", category: "Chemicals", priority: "Medium" as const, status: "Open" as const, deadline: "2026-06-25", vendors: 3, quotes: 1, value: 28900 },
  { id: "RFQ-2026-0416", title: "Last-Mile Delivery Contract APAC", category: "Logistics", priority: "High" as const, status: "Closed" as const, deadline: "2026-06-10", vendors: 5, quotes: 5, value: 215000 },
];

export const invoices = [
  { id: "INV-88210", vendor: "Steelworks India Pvt Ltd", po: "PO-50211", amount: 184500, status: "Pending" as const, due: "2026-06-20" },
  { id: "INV-88209", vendor: "Quantum Software Labs", po: "PO-50209", amount: 24800, status: "Paid" as const, due: "2026-06-05" },
  { id: "INV-88208", vendor: "GreenLeaf Packaging", po: "PO-50205", amount: 41200, status: "Pending" as const, due: "2026-06-18" },
  { id: "INV-88207", vendor: "Nordic Components AB", po: "PO-50202", amount: 78600, status: "Overdue" as const, due: "2026-05-28" },
  { id: "INV-88206", vendor: "Bharat Office Supplies", po: "PO-50198", amount: 12450, status: "Paid" as const, due: "2026-05-30" },
];

export const purchaseOrders = [
  { id: "PO-50211", vendor: "Steelworks India Pvt Ltd", date: "2026-06-02", amount: 184500, status: "In Transit" as const },
  { id: "PO-50210", vendor: "Apex Industrial Tools", date: "2026-06-01", amount: 33200, status: "Delivered" as const },
  { id: "PO-50209", vendor: "Quantum Software Labs", date: "2026-05-29", amount: 24800, status: "Delivered" as const },
  { id: "PO-50208", vendor: "Pacific Logistics Co.", date: "2026-05-27", amount: 215000, status: "Acknowledged" as const },
  { id: "PO-50207", vendor: "Mediterra Chemicals", date: "2026-05-25", amount: 28900, status: "In Transit" as const },
];

export const activities = [
  { id: 1, type: "rfq" as const, actor: "Priya Sharma", action: "created RFQ", target: "RFQ-2026-0421 · CNC Machining Spare Parts", time: "12 min ago" },
  { id: 2, type: "quote" as const, actor: "Nordic Components AB", action: "submitted quotation for", target: "RFQ-2026-0420", time: "1 hr ago" },
  { id: 3, type: "approval" as const, actor: "Arjun Mehra", action: "approved", target: "PO-50211 · $184,500", time: "3 hrs ago" },
  { id: 4, type: "po" as const, actor: "System", action: "generated", target: "PO-50211 for Steelworks India", time: "3 hrs ago" },
  { id: 5, type: "invoice" as const, actor: "GreenLeaf Packaging", action: "sent invoice", target: "INV-88208 · $41,200", time: "Yesterday" },
  { id: 6, type: "approval" as const, actor: "Neha Kapoor", action: "requested changes on", target: "RFQ-2026-0419", time: "Yesterday" },
  { id: 7, type: "rfq" as const, actor: "Vikram Iyer", action: "awarded", target: "RFQ-2026-0418 to GreenLeaf Packaging", time: "2 days ago" },
];

export const spendTrend = [
  { month: "Jan", spend: 412, budget: 500 },
  { month: "Feb", spend: 386, budget: 500 },
  { month: "Mar", spend: 521, budget: 500 },
  { month: "Apr", spend: 478, budget: 520 },
  { month: "May", spend: 612, budget: 600 },
  { month: "Jun", spend: 548, budget: 600 },
];

export const rfqStatus = [
  { name: "Open", value: 24, color: "var(--chart-2)" },
  { name: "Closed", value: 38, color: "var(--chart-1)" },
  { name: "Awarded", value: 19, color: "var(--chart-3)" },
  { name: "Cancelled", value: 6, color: "var(--chart-5)" },
];

export const vendorPerf = [
  { name: "Steelworks", score: 96 },
  { name: "Quantum", score: 94 },
  { name: "Nordic", score: 91 },
  { name: "GreenLeaf", score: 89 },
  { name: "Bharat", score: 85 },
  { name: "Pacific", score: 78 },
];

export const spendByCategory = [
  { name: "Raw Materials", value: 1840 },
  { name: "IT Services", value: 640 },
  { name: "Logistics", value: 980 },
  { name: "Packaging", value: 320 },
  { name: "Chemicals", value: 410 },
  { name: "Tools", value: 510 },
];

export const comparisonData = {
  rfq: "RFQ-2026-0421 · CNC Machining Spare Parts",
  vendors: [
    { name: "Steelworks India", price: 184500, delivery: "14 days", rating: 4.8, compliance: 98, warranty: "24 months", recommended: true },
    { name: "Apex Industrial", price: 192300, delivery: "10 days", rating: 4.1, compliance: 89, warranty: "18 months", recommended: false },
    { name: "Nordic Components", price: 201400, delivery: "12 days", rating: 4.6, compliance: 95, warranty: "24 months", recommended: false },
    { name: "Mediterra Supply", price: 178900, delivery: "21 days", rating: 4.0, compliance: 86, warranty: "12 months", recommended: false },
  ],
};
