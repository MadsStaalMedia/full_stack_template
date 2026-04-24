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
      setError('Den gruppe findes allerede');
      return;
    };

    await createGroup(form)
    setForm({ name: "" })
  };

  return (
    <div>
    
        <form className="flex gap-2 mb-4">
            <Input
                placeholder="Gruppe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {error && <span style={{ color: 'red' }}>{error}</span>}
            <Button onClick={handleSubmit}>Tilføj</Button>
        </form>

    </div>
  )
}