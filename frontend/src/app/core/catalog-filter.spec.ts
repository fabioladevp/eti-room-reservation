import { filterRooms } from './catalog-filter';
import { Room } from './models';

describe('catalogue des salles', () => {
  const rooms:Room[]=[
    {id:1,code:'A',name:'Auditorium',building:'Académie',location:'Académie',bufferMinutes:45,status:'AVAILABLE',active:true,photoUrl:'',capacities:[{layout:'THEATRE',capacity:120}],equipment:[{id:1,code:'PROJECTION',name:'Projection',type:'FIXED',totalQuantity:1,availableQuantity:1,status:'AVAILABLE'}]},
    {id:2,code:'B',name:'Salon VIP',building:'PAC',location:'PAC',bufferMinutes:30,status:'AVAILABLE',active:true,photoUrl:'',capacities:[{layout:'BOARDROOM',capacity:24}],equipment:[{id:2,code:'WIFI',name:'Wi-Fi',type:'FIXED',totalQuantity:1,availableQuantity:1,status:'AVAILABLE'}]}
  ];
  it('combine bâtiment, disposition, capacité et équipement',()=>{
    expect(filterRooms(rooms,{q:'aud',building:'Académie',layout:'THEATRE',capacity:100,equipment:'PROJECTION'}).map(r=>r.id)).toEqual([1]);
  });
  it('réinitialise les filtres sans perdre le catalogue',()=>{
    const reset={q:'',building:'',layout:'',capacity:0,equipment:''};
    expect(filterRooms(rooms,reset).length).toBe(2);
    expect(filterRooms(rooms,reset).length).toBe(2);
  });
});
