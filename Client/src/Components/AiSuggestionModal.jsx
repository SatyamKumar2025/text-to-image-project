import React, { useState } from "react";
import { motion } from "motion/react";
import { toast } from "react-toastify";

const AiSuggestionModal = ({ onClose, onGenerate }) => {
  const [promptInput, setPromptInput] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const handleSuggest = async () => {
    if (!promptInput.trim()) return;
    setLoading(true);

    // Simulated API call to AI
    setTimeout(() => {
      const suggestion = `A highly detailed fantasy illustration of ${promptInput}`;
      setAiSuggestion(suggestion);
      toast.success("AI suggestion generated!");
      setShowSuggestion(true);
      setLoading(false);
    }, 1000);
  };

  const handleGenerate = () => {
    if (aiSuggestion) {
      onGenerate(aiSuggestion);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0.2, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full max-w-md mx-4 rounded-xl p-6 shadow-lg relative"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          AI Prompt Suggestion
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Describe your idea briefly and let AI suggest a detailed prompt.
        </p>

        <input
          type="text"
          placeholder="e.g. futuristic city skyline"
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {!showSuggestion && (
          <button
            onClick={handleSuggest}
            disabled={loading}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Suggesting..." : "Suggest"}
          </button>
        )}

        {showSuggestion && (
          <>
            <textarea
              value={aiSuggestion}
              onChange={(e) => setAiSuggestion(e.target.value)}
              className="w-full mt-4 border border-gray-300 rounded-lg p-3 text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              onClick={handleGenerate}
              className="w-full mt-4 bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition"
            >
              Generate from Suggestion
            </button>
          </>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✖
        </button>
      </motion.div>
    </div>
  );
};

export default AiSuggestionModal;
