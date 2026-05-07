

"use client";

interface Props {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cardType: string;
}

export default function CardPreview({
  cardNumber,
  cardName,
  expiry,
  cardType,
}: Props) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-5 shadow-lg">
      <div className="flex justify-between">
        <span className="text-sm">{cardType}</span>
      </div>

      <div className="mt-6 text-lg tracking-widest">
        {cardNumber || "#### #### #### ####"}
      </div>

      <div className="flex justify-between mt-6 text-sm">
        <div>
          <p className="opacity-70">Card Holder</p>
          <p>{cardName || "YOUR NAME"}</p>
        </div>
        <div>
          <p className="opacity-70">Expires</p>
          <p>{expiry || "MM/YY"}</p>
        </div>
      </div>
    </div>
  );
}