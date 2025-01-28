using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<ActionResult<List<User>>> GetAll()
    {
        var users = await _userService.GetUsers();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetById(int id)
    {
        var user = await _userService.GetUserById(id);
        return user != null ? Ok(user) : NotFound();
    }

    [HttpGet("{id}/tasks")]
    public async Task<ActionResult<UserTask>> GetUserTasksByUserId(int id)
    {
        var userTasks = await _userService.GetUserTaskByUserId(id);

        return Ok(userTasks);

    }

    [HttpPost]
    public async Task<ActionResult<User>> Create(User user)
    {
        var createdUser = await _userService.CreateUser(user);
        return CreatedAtAction(nameof(GetById), new { id = createdUser.Id }, createdUser);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, User user)
    {
        if (id != user.Id) return BadRequest();
        await _userService.UpdateUser(user);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _userService.DeleteUser(id);
        return NoContent();
    }
}