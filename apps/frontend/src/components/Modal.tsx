import React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
    title?: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto z-[9999] p-4">
            <div className="bg-zinc-900 text-white rounded-lg shadow-lg w-full max-w-md relative p-6 animate-fadeIn border border-fucsiaNeon/40 mt-24 mb-10">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-fucsiaNeon hover:text-white transition"
                    aria-label="Cerrar modal"
                >
                    <X className="w-5 h-5" />
                </button>

                {title && (
                    <h2 className="text-xl font-semibold mb-4 text-center text-fucsiaNeon drop-shadow-[0_0_6px_rgba(255,0,255,0.6)]">
                        {title}
                    </h2>)
                    }
                <div>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};