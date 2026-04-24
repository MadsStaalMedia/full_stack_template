import { useState } from "react"
import { useGroups } from "~/services/apiService"
import { Input } from "@base-ui/react/input"
import { Button } from "@base-ui/react/button"

export function GroupAdd() {
    const { options, createGroup } = useGroups();
    const [form, setForm] = useState({ name: "" })

  const handleSubmit = async () => {
    await createGroup(form.name)
    setForm({ name: "" })
  }

  return (
    <div>
    
        <div className="flex gap-2 mb-4">
            <Input
                placeholder="Gruppe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Button onClick={handleSubmit}>Tilføj</Button>
        </div>

    </div>
  )
}