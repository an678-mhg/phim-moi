import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { query, where, onSnapshot, collection } from "firebase/firestore";

const useFireStore = (table, conditional) => {
  const { fieldName, operator, compareValue } = conditional;

  const [document, setDocument] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, table),
      where(fieldName, operator, compareValue)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setDocument(documents);
        setLoading(false);
        setError(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
        setDocument(null);
        setError(true);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [table, fieldName, operator, compareValue]);

  return { document, loading, error };
};

export default useFireStore;
