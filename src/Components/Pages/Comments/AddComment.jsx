function AddComment() {
  return (
    <>
      <form className="video-comment">
        <p className="a_venir">Commentaires <span>Prochainement</span></p>
        <input type="text" name="comment" placeholder="Ajoute un commentaire" />
      </form>
    </>
  );
}

export default AddComment;
