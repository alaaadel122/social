export default function formateDate(date) {
     const createdAt = new Date(date);
     const now = new Date();

     const diffMs = now - createdAt;
     const diffMinutes = Math.floor(diffMs / 60000);
     const diffHours = Math.floor(diffMs / 3600000);
     const diffDays = Math.floor(diffMs / 86400000);

     if (diffMinutes < 1) {
          return "now";
     } else if (diffMinutes < 60) {
          return `${diffMinutes} min ago`;
     } else if (diffHours < 24) {
          return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
     } else if (diffDays === 1) {
          return "Yesterday";
     } const options = {
          day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit',
          minute: '2-digit',
     };
     const result = createdAt.toLocaleDateString('en-GB', options)
     return result;
}