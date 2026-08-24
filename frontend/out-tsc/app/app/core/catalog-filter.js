export function filterRooms(rooms, f) {
    const q = f.q.trim().toLowerCase();
    return rooms.filter(r => (!q || r.name.toLowerCase().includes(q))
        && (!f.building || r.building === f.building)
        && (!f.layout || r.capacities.some(c => c.layout === f.layout))
        && (!f.capacity || r.capacities.some(c => c.capacity >= f.capacity))
        && (!f.equipment || r.equipment.some(e => e.code === f.equipment)));
}
//# sourceMappingURL=catalog-filter.js.map