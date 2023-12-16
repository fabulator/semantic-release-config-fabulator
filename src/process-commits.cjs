module.exports = (commits) => {
    return commits.flatMap((commit) => {
        const { subject } = commit;
        if (!subject.includes(';')) {
            return commit;
        }

        return subject.split(';').map((message) => {
            const trimmedMessage = message.trim();
            return {
                ...commit,
                message: trimmedMessage,
                subject: trimmedMessage,
            };
        });
    });
};
