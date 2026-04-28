// Create an api service for querying the backend here
import { useState, useEffect } from "react";
import axios from "axios"
import type { Staff, Group } from "~/components/columns";
import type { group } from "console";

const fetchPersonnel = async () => {

  const response = await axios.get<Staff[]>("https://mmd26fprojekt-default-rtdb.europe-west1.firebasedatabase.app/personnel.json");

  const raw = response.data as unknown as Record<string, { name: string; email: string; group: string; status: "active" | "inactive" }>;

  return Object.keys(raw).map(id => ({
    id,
    name: raw[id].name,
    email: raw[id].email,
    group: raw[id].group,
    status: raw[id].status
  }));
}


export function usePersonnel() {
    const [data, setData] = useState<Staff[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchPersonnel()
        .then(setData)
        .catch(() => setError("Kunne ikke hente personale"))
        .finally(() => setLoading(false));
    }, [])


    const createStaff = async (newStaff: Omit<Staff, "id">) => {
        try {
            const response = await axios.post("https://mmd26fprojekt-default-rtdb.europe-west1.firebasedatabase.app/personnel.json", newStaff)
            const createdStaff: Staff = { ...newStaff, id: response.data.name };
            setData((prev) => [...prev, createdStaff]);
            const updated = await fetchPersonnel();
            setData(updated)
      setData(updated);
        } catch (err) {
            setError("Kunne ikke oprette personale");
        }
    };

    const changeStaff = async (id: string, status: "active" | "inactive") => {
      try {
        const response = await axios.put(`https://mmd26fprojekt-default-rtdb.europe-west1.firebasedatabase.app/personnel/${id}/status.json`, JSON.stringify(status));
        setData(prev => prev.map(staff =>
        staff.id === id ? { ...staff, status } : staff
    ));
      } catch (err) {
        console.error(err);
      }
    };

    return { data, loading, error, createStaff, changeStaff }

}

export function useGroups() {
  const [options, setOptions] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null)

  const fetchGroups = async () => {
    try {
      const response = await axios.get("https://mmd26fprojekt-default-rtdb.europe-west1.firebasedatabase.app/groups.json");
    
      const raw = response.data as unknown as Record<string, { group: string; status: "active" | "inactive" }>;

      const mappedEntries = Object.keys(raw).map(id => ({
        id,
        group: raw[id].group,
        status: raw[id].status
      }));

      setOptions(mappedEntries);
        
    } catch (err) {
      setError("Kunne ikke hente personalegrupper")
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
    }, []);

  const createGroup = async (newGroup: Omit<Group, "id">) => {
    if (!newGroup) return;

    try {
      const response = await axios.post("https://mmd26fprojekt-default-rtdb.europe-west1.firebasedatabase.app/groups.json", {...newGroup, status: "active"} );

      const createdGroup: Group = { ...newGroup, id: response.data.name, status: "active" };

      setOptions((prev) => [...prev, createdGroup]);
      
    } catch (err) {
        setError("Kunne ikke oprette personalegruppe");
    }
    
  };

  const deleteGroup = async (id: string) => {
    await axios.delete(
      `https://mmd26fprojekt-default-rtdb.europe-west1.firebasedatabase.app/groups/${id}.json`
    );
  }

  const removeGroup = async (id: string, staffData: Staff[]) => {
    const groupBeingDeleted = options.find(g => g.id === id);
  
    const hasActiveStaff = staffData.some(
      staff => staff.group === groupBeingDeleted?.group && staff.status === "active"
    );

    if (hasActiveStaff) {
      setError("Gruppe kan ikke slettes. Der er stadig aktivt personale i gruppen.");
      return;
    };

    try {
      await deleteGroup(id);
      setOptions(prev => prev.filter(group => group.id !== id));
      setError(null);
    } catch (err) {
      console.error(err);
    };
  };

  return { options, loading, error, createGroup, removeGroup };
}