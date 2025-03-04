"use client";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [type, setType] = useState("game");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Submit");

  useEffect(() => {
    let dotsInterval = null;

    if (loading) {
      // Cycle through the variations: "Generating.", "Generating..", "Generating..."
      const frames = ["Generating.", "Generating..", "Generating...", "Generating...."];
      let index = 0;

      dotsInterval = setInterval(() => {
        setLoadingText(frames[index]);
        index = (index + 1) % frames.length;
      }, 400); // switch every 400ms (or pick your speed)
    } else {
      // If not loading, reset to "Submit"
      setLoadingText("Submit");
    }

    return () => {
      if (dotsInterval) clearInterval(dotsInterval);
    };
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://primary-production-4623.up.railway.app/webhook/70d97dd0-d73e-43f4-b12b-4c6ee4041809", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type, content }),
        }
      );

      if (!response.ok) {
        throw new Error("PDF generation request failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "result.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Error generating PDF. Check console for details.");
    } finally {
      setLoading(false); // always stop loading, even if error
    }
  };

  // Button is disabled if we are loading OR content is empty
  const isButtonDisabled = loading || content.trim() === "";

  return (
    <main className="hero">
      <div className="hero-container" style={{ justifyContent: "center" }}>
        <div className="hero-content" style={{ maxWidth: "500px", margin: "0 auto" }}>
          <h1 className="text-primary" style={{ marginBottom: "1rem", textAlign: "center" }}>
            Competitive Analysis Agent
          </h1>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ padding: "0.5rem" }}
            >
              <option value="game">Game</option>
              <option value="genre">Genre</option>
            </select>

            <label htmlFor="content">Content:</label>
            <input
              id="content"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="e.g. Outer Wilds"
              style={{ padding: "0.5rem" }}
            />

            <button
              type="submit"
              disabled={isButtonDisabled}
              style={{
                padding: "0.75rem",
                backgroundColor: isButtonDisabled
                  ? "gray"
                  : "var(--primary-green)",
                border: "none",
                borderRadius: "6px",
                cursor: isButtonDisabled ? "not-allowed" : "pointer",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              {loadingText}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
