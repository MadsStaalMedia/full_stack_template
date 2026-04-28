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
    <div className="border-b border-gray-200 pb-6 mb-6">

      <h2 className="text-2xl font-bold">Opret personalegruppe</h2>
    
        <form className="flex gap-2 my-4" onSubmit={handleSubmit}>
            <Input
              className="border border-gray-300 px-3 py-2 outline-none focus:ring-1 focus:ring-black-300"
              required
              minLength={1}
              placeholder="Gruppe"
              value={form.group}
              onChange={(e) => setForm({ ...form, group: e.target.value })}
            />
            {error && <span style={{ color: 'red' }}>{error}</span>}
            <Button
            className="border border-gray-300 px-3 py-2 outline-none focus:ring-1 focus:ring-black-300"
            type="submit"
            >
              Tilføj
            </Button>
        </form>

    </div>
  )
}