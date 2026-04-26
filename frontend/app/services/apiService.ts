// Create an api service for querying the backend here
import { useState, useEffect } from "react";
import axios from "axios"
import type { Staff, Group } from "~/components/columns";
import type { group } from "console";

export function usePersonnel() {
    const [data, setData] = useState<Staff[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchPersonnel = async () => {
      try {
        const response = await axios.get<Staff[]>("https://mmd26fprojekt-default-rtdb.europe-west1.firebasedatabase.app/personnel.json");

        const raw = response.data as unknown as Record<string, { name: string; email: string; group: string; status: "active" | "inactive" }>;

        const mappedEntries = Object.keys(raw).map(id => ({
          id,
          name: raw[id].name,
          email: raw[id].email,
          group: raw[id].group,
          status: raw[id].status
        }));

        setData(mappedEntries);
      } catch (err) {
        setError("Kunne ikke hente personale");
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
        fetchPersonnel()
    }, [])


    const createStaff = async (newStaff: Omit<Staff, "id">) => {
        try {
            const response = await axios.post("https://mmd26fprojekt-default-rtdb.europe-west1.firebasedatabase.app/personnel.json", newStaff)
            const createdStaff: Staff = { ...newStaff, id: response.data.name };
            console.log(createdStaff);
            setData((prev) => [...prev, createdStaff]);
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
      console.log(response.data);
    
      const raw = response.data as unknown as Record<string, { group: string; status: "active" | "inactive" }>;
      console.log(raw);

      const mappedEntries = Object.keys(raw).map(id => ({
        id,
        group: raw[id].group,
        status: raw[id].status
      }));

      console.log(mappedEntries[0]);

      setOptions(mappedEntries);
        
    } catch (err) {
      setError("Kunne ikke hente personalegrupper")
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
    console.log(options);
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

  const changeGroup = async (id: string, status: "active" | "inactive") => {
    try {
      const response = await axios.put(`https://mmd26fprojekt-default-rtdb.europe-west1.firebasedatabase.app/groups/${id}/status.json`, JSON.stringify(status));
    } catch (err) {
      console.error(err);
    }
  };

  return { options, loading, error, createGroup, changeGroup };
}