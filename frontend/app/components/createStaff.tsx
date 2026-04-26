import { useState } from "react"
import { usePersonnel, useGroups } from "~/services/apiService"
import { Input } from "@base-ui/react/input"
import { Button } from "@base-ui/react/button"


export function PersonnelAdd() {
    const { data, createStaff } = usePersonnel();
    const { options, loading } = useGroups();
    const [form, setForm] = useState({ name: "", email: "", group: "", status: "active" });
    const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.some((data) => data.email === form.email)) {
        setError('Email er allerede i brug');
        return;
    } else if (form.group == "") {
        setError('Vælg en personalegruppe');
        return;
    }

    await createStaff(form);
    setForm({ name: "", email: "", group: "", status: "active" });
  }

  return (
    <div>
    
        <form className="flex gap-2 mb-4" onSubmit={handleSubmit}>
            <Input
                type="text"
                minLength={1}
                maxLength={80}
                placeholder="Navn"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <Input
                type="email"
                required
                minLength={1}
                placeholder="Email"
                maxLength={80}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <select value={form.group} onChange={e => setForm({ ...form, group: e.target.value})}>
                <option>Vælg personallegruppe</option>
                {options.length > 0 && options.map(opt => (
                    <option key={opt.id} value={opt.group}>{opt.group}</option>))}
            </select>

            {error && <span style={{ color: 'red' }}>{error}</span>}

            <Button type="submit">Tilføj</Button>
        </form>

    </div>
  )
}