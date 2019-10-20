module.export = (commits) => {
    return commits.map((commit) => {
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
            }
        })
    }).flat();
};
