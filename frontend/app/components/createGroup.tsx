import { useState } from "react"
import { useGroups } from "~/services/apiService"
import { Input } from "@base-ui/react/input"
import { Button } from "@base-ui/react/button"

export function GroupAdd() {
    const { options, createGroup } = useGroups();
    const [form, setForm] = useState({ name: "" });
    const [error, setError] = useState('');

  const handleSubmit = async () => {

    if (options.some((options) => options.group === form.name)) {
      setError('Gruppen findes allerede');
      return;
    };

    await createGroup(form)
    setForm({ name: "" })
  };

  return (
    <div>
    
        <form className="flex gap-2 mb-4" onSubmit={handleSubmit}>
            <Input
              required
              minLength={1}
              placeholder="Gruppe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {error && <span style={{ color: 'red' }}>{error}</span>}
            <Button type="submit">Tilføj</Button>
        </form>

    </div>
  )
}