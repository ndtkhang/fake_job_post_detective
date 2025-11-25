"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react";

export default function ParserForm() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mutation = api.post.parse.useMutation();

  const onSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setResult(null);

    try {
      const res = await mutation.mutateAsync({ text });
      setResult(res);
    } catch (err: any) {
      setError(err?.message ?? String(err));
    }
  };

  // Small recursive JSON renderer for nicer display
  function JSONView({ data }: { data: any }) {
    if (data === null || data === undefined) {
      return <span className="text-gray-600">null</span>;
    }

    if (typeof data === "string") {
      return <span className="text-green-600">"{data}"</span>;
    }

    if (typeof data === "number") {
      return <span className="text-purple-600">{String(data)}</span>;
    }

    if (typeof data === "boolean") {
      return <span className="text-orange-600">{String(data)}</span>;
    }

    if (Array.isArray(data)) {
      return (
        <div className="ml-4">
          [
          {data.map((item, i) => (
            <div key={i} className="pl-4">
              <JSONView data={item} />{i < data.length - 1 ? "," : null}
            </div>
          ))}
          ]
        </div>
      );
    }

    // object
    return (
      <div className="ml-2">
            {Object.entries(data).map(([k, v], idx, arr) => (
              <div key={`${k}-${idx}`} className="flex gap-2">
            <div className="font-mono text-sm text-gray-700">
              <strong className="font-semibold">{k}</strong>:
            </div>
            <div className="flex-1 text-sm">
              <JSONView data={v} />{idx < arr.length - 1 ? "," : null}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-4">
      <form onSubmit={onSubmit} className="flex flex-col" style={{ flex: "0 0 auto" }}>
        <label className="text-sm font-medium mb-2">Job description</label>
        <textarea
          className="min-h-[220px] h-56 p-3 rounded-md border border-gray-200 bg-white text-sm resize-y"
          placeholder="Paste the job description here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="mt-3 flex items-center gap-3">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Parsing..." : "Parse"}
          </button>

          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200"
            onClick={() => {
              setText("");
              setResult(null);
              setError(null);
            }}
          >
            Clear
          </button>
        </div>
      </form>

      <div className="flex-1 overflow-auto p-4 bg-slate-50 rounded-md border border-gray-100">
        {error ? (
          <div className="text-red-600">Error: {error}</div>
        ) : result ? (
          <div className="prose max-w-full">
            <h3 className="text-lg font-semibold mb-2">Parsed Result</h3>
            <div className="text-sm bg-white p-3 rounded shadow-sm">
              <JSONView data={result} />
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500">Result will appear here</div>
        )}
      </div>
    </div>
  );
}
