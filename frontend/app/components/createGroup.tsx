import { useState } from "react"
import { useGroups } from "~/services/apiService"
import { Input } from "@base-ui/react/input"
import { Button } from "@base-ui/react/button"

export function GroupAdd() {
    const { options, createGroup } = useGroups();
    const [form, setForm] = useState({ group: "" });
    const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (options.some((options) => options.group === form.group)) {
      setError('Gruppen findes allerede');
      return;
    };

    await createGroup(form)
    setForm({ group: "" })
  };

  return (
    <div>
    
        <form className="flex gap-2 mb-4" onSubmit={handleSubmit}>
            <Input
              required
              minLength={1}
              placeholder="Gruppe"
              value={form.group}
              onChange={(e) => setForm({ ...form, group: e.target.value })}
            />
            {error && <span style={{ color: 'red' }}>{error}</span>}
            <Button type="submit">Tilføj</Button>
        </form>

    </div>
  )
}