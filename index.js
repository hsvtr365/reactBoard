const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;

// 메타정보 설정하나봄
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//임시 데이터
const users = [
 { id: "hsvtr365", name: "합성" },
 { id: "jissjiss", name: "휴지" },
 { id: "kimsuji", name: "합성휴지" }
];


app.get('/', (req, res) => {//'/'는 경로를 의미함
	res.send(`Okay let's go`)
})

/**
 * Get 요청데이터가 없음. 반환값은 있음.
 * 
 */
app.get("/api/users", (req, res) => {

    res.json({ok: true, users: users});
})

/**http://localhost:4000/api/users/userQuery?user_id=hsvtr365
 * Get Query Params 방식,
 * 
 */
app.get('/api/users/userQuery', (req, res) => {
    console.log(`/api/users/userQuery`);
    
    const user_id = req.query.user_id
    const user = users.filter(d => d.id == user_id); //filter => 배열에서 조건에 맞는 배열 반환
	res.json({ok:false, user:user})
})


/**
 * Get Body 방식, post와 비슷하게 body에 넣는다.
 * 
 */
app.get('/api/users/userBody', (req, res) => {
    console.log(`/api/users/userBody`);
    
    const user_id = req.body.user_id
    const user = users.filter(d => d.id == user_id); 
	res.json({ok:false, user:user})
})

/**http://localhost:4000/api/users/userBody/hsvtr365
 * Get Path Variables 방식. 콜론 뒤는 변수다. 맨 뒤에 붙여야 함. 
 * 
 */
app.get('/api/users/userBody/:user_id', (req, res) => {
    console.log(`/api/users/userBody/:user_id`);

    const user_id = req.params.user_id
    const user = users.filter(d => d.id == user_id); 
	res.json({ok:false, user:user})
})


/**
 * Post, 데이터 생성시, 보통 req.body에 담는다.
 * 
 */
app.post('/api/users/add', (req, res) => {
    console.log(`/api/users/add`);
    
    const {id, name} = req.body
    const user = users.concat({id, name});  //concat . 배열로 만들어줌
	res.json({ok:true, user:user})
})

/**
 * put, 전체 데이터 수정
 * 
 */
app.put('/api/users/add', (req, res) => {
    console.log(`/api/users/add`);
    
    const {id, name} = req.body

    const user = users.map( d => {
        if(d.id ==id) d.name = name

        return {id:d.id, name:d.name}
    })
    
	res.json({ok:true, users:user})
})

/**
 * put, 1개 데이터 수정
 * 
 */

app.patch('/api/user/update/:user_id', (req, res) => {
    console.log(`/api/user/update/:user_id`);
    const { user_id} = req.params
    const { name } = req.body

    const user = users.map(data => {

        if(data.id == user_id) data.name = name

        return {
            id: data.id,
            name: data.name
        }
    })

})

/** /api/user/delete?user_id=hsvtr365
 * delete, 데이터 삭제
 * 
 */
app.delete("/api/user/delete", (req, res) => {
    console.log(`/api/user/delete`);
    const user_id = req.query.user_id
    const user = users.filter(data => data.id != user_id );

    res.json({ok: true, users: user})
})


app.listen(PORT, () => {
	console.log(`Server on : http://localhost:${PORT}/`);
})