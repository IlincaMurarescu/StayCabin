const commentsFile = path.join(__dirname, "data", "comments.json");

class Comment {
  static loadComments() {
    return JSON.parse(fs.readFileSync(commentsFile, "utf8"));
  }

  static saveComments(comments) {
    fs.writeFileSync(commentsFile, JSON.stringify(comments, null, 2));
  }

  static getAll() {
    return this.loadComments();
  }

  static getById(id) {
    const comments = this.loadComments();
    return comments.find((comment) => comment.id === id);
  }

  static getByCabinId(cabinId) {
    const comments = this.loadComments();
    return comments.filter((comment) => comment.cabin_id === cabinId);
  }

  static create(newComment) {
    const comments = this.loadComments();
    newComment.id =
      comments.length > 0 ? comments[comments.length - 1].id + 1 : 1;
    comments.push(newComment);
    this.saveComments(comments);
    return newComment;
  }

  static delete(id) {
    let comments = this.loadComments();
    const initialLength = comments.length;
    comments = comments.filter((comment) => comment.id !== id);

    if (comments.length === initialLength) return false;

    this.saveComments(comments);
    return true;
  }
}

module.exports = Comment;
