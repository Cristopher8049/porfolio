const apiBlog = {
    async getBlog() {
        try {
            const response = await fetch("../data/blog.json");

            if (!response.ok)
                throw new Error(response.status);

            const data = await response.json();
            console.log(data)

            return data;
        }
        catch (error) {
            console.error(error);
        }
    }
}


export default apiBlog;