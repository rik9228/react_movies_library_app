import { useAuthContext } from "../../components/providers/AuthProvider";
import { db } from "../../firebase";

export const deleteFavoriteMovie = (movie) => {
  const postDoc_query = db
    .collection("movies")
    .where("content.id", "==", movie.id);

  postDoc_query.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      doc.ref.delete();
      movie.isFavorite = false;
    });
  });
};
