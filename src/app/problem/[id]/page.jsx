import PrblmDetailComp from "@/components/Problems/PrblmDetailComp";
import React from "react";

async function ProblemPage({ params }) {
  const { id } = await params;

  return (
    <div>
      <PrblmDetailComp id={id} />{" "}
    </div>
  );
}

export default ProblemPage;
