import { useState } from "react"
import { usePersonnel, useGroups } from "~/services/apiService"
import { Input } from "@base-ui/react/input"
import { Button } from "@base-ui/react/button"


export function PersonnelAdd() {
    const { data, error, createStaff } = usePersonnel();
    const { options, loading } = useGroups();
    const [form, setForm] = useState({ name: "", email: "", group: "", status: "active" })

  const handleSubmit = async () => {
    await createStaff(form)
    setForm({ name: "", email: "", group: "", status: "active" })
  }

  

  return (
    <div>
    
        <form className="flex gap-2 mb-4">
            <Input
                placeholder="Navn"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <select value={form.group} onChange={e => setForm({ ...form, group: e.target.value})}>
                <option>Vælg personallegruppe</option>
                {options.length > 0 && options.map(opt => (
                    <option key={opt.id} value={opt.group}>{opt.group}</option>))}
            </select>
            <Button onClick={handleSubmit}>Tilføj</Button>
        </form>

    </div>
  )
}