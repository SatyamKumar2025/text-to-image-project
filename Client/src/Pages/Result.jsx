import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import AiSuggestionModal from "../Components/AiSuggestionModal";

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      initial={{ opacity: 0 }} // Starts as fully transparent
      animate={{ opacity: 1 }} // Fades in to full opacity
      exit={{ opacity: 0 }} // Fades out
      transition={{ duration: 0.3, ease: "easeOut" }} // Smooth fade-in/out
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-80 text-center"
        initial={{ opacity: 0, scale: 0.95 }} // Starts slightly smaller and transparent
        animate={{ opacity: 1, scale: 1 }} // Fades in and scales to normal size
        exit={{ opacity: 0, scale: 0.95 }} // Fades out and scales down
        transition={{ duration: 0.3, ease: "easeOut" }} // Smooth transition
      >
        <h3 className="text-lg font-semibold mb-4">
          Are you sure you want to regenerate this image?
        </h3>
        <div className="flex justify-around">
          <button
            onClick={onCancel}
            className="bg-gray-300 px-6 py-2 rounded-md text-black font-medium hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 px-6 py-2 rounded-md text-white font-medium hover:bg-blue-600"
          >
            OK
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Result = () => {
  const [image, setImage] = useState(assets.third_image);
  const [isImageloaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const { generateImage } = useContext(AppContext);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const onSumbitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (input) {
      const Image = await generateImage(input);
      if (Image) {
        setIsImageLoaded(true);
        setImage(Image);
        setHistory((prev) => [{ prompt: input }, ...prev]);
      }
    } else {
    }
    setLoading(false);
  };
  const handleRegenerate = async (prompt) => {
    setLoading(true);
    const Image = await generateImage(prompt); // This will regenerate the image with the given prompt
    if (Image) {
      setIsImageLoaded(true);
      setImage(Image);
    }
    setLoading(false);
  };
  const handleHistoryClick = (prompt) => {
    setSelectedPrompt(prompt);
    setShowModal(true); // Show modal to confirm regeneration
  };
  const handleConfirmRegenerate = () => {
    handleRegenerate(selectedPrompt); // Regenerate the image with selected prompt
    setShowModal(false); // Hide modal after confirmation
  };
  return (
    <div
      className={`flex flex-col items-center w-full max-w-6xl mx-auto gap-8 px-4 relative transition-all duration-300 ${
        showHistory ? "pr-80" : ""
      }`}
    >
      <motion.form
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={onSumbitHandler}
        className="flex flex-col w-full md:w-[65%] min-h-[70vh] justify-center items-center"
      >
        <div>
          <div className="relative">
            <img src={image} alt="" className="max-w-md rounded" />
            <span
              className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
                loading ? "w-full transition-all duration-[10s]" : "w-0"
              }`}
            />
          </div>
          <p className={!loading ? "hidden" : ""}>Loading.....</p>
        </div>

        {!isImageloaded && (
          <div className="w-full max-w-[600px] mx-auto mt-8">
            {/* Textbox container */}
            <div className="flex w-full bg-neutral-500 text-white text-sm px-4 py-3 rounded-full">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Describe what you want to generate"
                className="flex-1 bg-transparent outline-none pl-4 min-w-[350px] placeholder-color"
              />
            </div>

            {/* Buttons below textbox */}
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              <button
                type="submit"
                className="bg-zinc-900 px-6 sm:px-10 py-2 sm:py-3 rounded-full text-white text-sm"
              >
                Generate
              </button>
              <button
                type="button"
                onClick={() => setIsAiModalOpen(true)}
                className="bg-blue-500 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-white text-sm hover:bg-blue-600"
              >
                AI Suggestion
              </button>
            </div>
          </div>
        )}

        {isImageloaded && (
          <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
            <p
              className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
              onClick={() => {
                setIsImageLoaded(false);
              }}
            >
              Generate Another
            </p>
            <a
              href={image}
              download
              className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
            >
              Download
            </a>
          </div>
        )}
      </motion.form>
      <div
        className="fixed top-1/2 right-0 bg-zinc-800 text-white px-4 py-2 rounded-l cursor-pointer z-50"
        onClick={() => setShowHistory((prev) => !prev)}
      >
        History
      </div>

      {showHistory && (
        <div
          className={`fixed top-[200px] right-0 h-[600px] w-80 bg-white shadow-lg z-50 p-4 overflow-y-auto transform transition-transform duration-300 ${
            showHistory ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={() => setShowHistory(false)}
            className="absolute top-4 right-4 text-2xl text-gray-600"
          >
            ✖️
          </button>
          <h2 className="text-lg font-semibold mb-4 text-center">🕘 History</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
            {history.length === 0 ? (
              <p>Nothing Generated Yet</p>
            ) : (
              history.map((item, index) => (
                <li
                  onClick={() => handleHistoryClick(item.prompt)} // Show modal before regenerating
                  className={`cursor-pointer px-2 py-1 rounded transition 
                ${
                  index === selectedHistoryIndex
                    ? "bg-blue-200 text-blue-900 font-semibold"
                    : "hover:bg-gray-100"
                }`}
                >
                  {item.prompt}
                </li>
              ))
            )}
          </ul>
          {history.length > 0 && (
            <button
              onClick={() => setHistory([])}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Clear History
            </button>
          )}
        </div>
      )}
      {isAiModalOpen && (
        <AiSuggestionModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          onGenerate={(suggestedPrompt) => {
            setInput(suggestedPrompt); // Set the input with AI text
            setIsAiModalOpen(false); // Close modal
          }}
        />
      )}
      {showModal && (
        <ConfirmationModal
          onCancel={() => setShowModal(false)} // Close modal on cancel
          onConfirm={handleConfirmRegenerate} // Regenerate image after confirmation
        />
      )}
    </div>
  );
};

export default Result;
